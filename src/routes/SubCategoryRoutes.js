const { CreateSubCategory, GetAllSubCategories, UpdateSubCategory, DeleteSubCategory, ToggleSubCategoryStatus } = require('../Controller/SubCategoryController');
const verifyToken = require('../middlewares/Token/verifyToken');


const SubCategoryRoutes = require('express').Router();

SubCategoryRoutes.post('/create', verifyToken, CreateSubCategory)
    .get('/all', GetAllSubCategories)
    .put('/update/:id', verifyToken, UpdateSubCategory)
    .delete('/delete/:id', verifyToken, DeleteSubCategory)
    .patch('/toggle-status/:id', verifyToken, ToggleSubCategoryStatus);

module.exports = SubCategoryRoutes;
