const express = require('express');
const { createCategory, deleteCategory, editCategory, getCategory } = require('../controllers/categoryController')

const router = express.Router();

router.post('/catagory', createCategory)

router.delete('/catagory/:id', deleteCategory)

router.patch('/update-category/:id', editCategory)

router.get('/categories', getCategory)

module.exports = router;