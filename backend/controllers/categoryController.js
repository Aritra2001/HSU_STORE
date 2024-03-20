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

module.exports = { createCategory }