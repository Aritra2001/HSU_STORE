const { default: mongoose } = require('mongoose');
const Category = require('../models/categoryModel')

const createCategory = async (req, res) => {

    const { category } = req.body;

    try {

        if(!category) {
            throw Error('Enter a category name!')
        }

        const check = await Category.findOne({ catagory: { $regex: new RegExp('^' + category + '$', 'i') } });

        if(check)
        {
            throw Error('Category alreay exits!')
        }

        const categoryUpperCase = category.toUpperCase();
        await Category.create({catagory: categoryUpperCase});

        res.status(200).json({message: 'Category created successfully!'})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deleteCategory = async (req, res) => {

    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({error: 'No such category!'})
    }

    const category = await Category.findByIdAndDelete({_id: id})

    if(!category) {
        throw Error('No such category!')
    }

    res.status(200).json(category);
}

const editCategory = async (req, res) => {
    const { category } = req.body;
    const { id } = req.params;

    const category_uppercase = category.toUpperCase();

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid category ID!' });
    }

    if(!category) {
        throw Error('Enter a category name!')
    }

    try {

        const updated_category = await Category.findByIdAndUpdate(id, { catagory: category_uppercase }, {new: true});

        if (!updated_category) {
            throw Error('Cannot update category!');
        }

        res.status(200).json(updated_category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getCategory = async (req, res) => {

    const categories = await Category.find({}).sort({createdAt: -1});

    res.status(200).json(categories)
}


module.exports = { createCategory, deleteCategory, editCategory, getCategory }