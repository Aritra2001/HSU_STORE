const express = require('express');
const { createCategory } = require('../controllers/categoryController')

const router = express.Router();

router.post('/catagory', createCategory)

module.exports = router;