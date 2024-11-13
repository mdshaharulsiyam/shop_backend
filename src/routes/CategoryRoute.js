
const { GetAllCategories, CreateCategory, UpdateCategory, DeleteCategory, ToggleCategoryStatus } = require('../Controller/CategoryController');
const verifyToken = require('../middlewares/Token/verifyToken');
const CategoryRoutes = require('express').Router();

CategoryRoutes.post('/create', verifyToken, CreateCategory)
    .get('/all', GetAllCategories)
    .put('/update/:id', verifyToken, UpdateCategory)
    .delete('/delete/:id', verifyToken, DeleteCategory)
    .patch('/toggle-status/:id', verifyToken, ToggleCategoryStatus);

module.exports = CategoryRoutes;
