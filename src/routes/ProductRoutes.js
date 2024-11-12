const { 
    CreateProduct, 
    GetAllProducts, 
    GetProductDetails, 
    UpdateProduct, 
    DeleteProduct, 
    ApproveProduct, 
    MakeFeaturedProduct 
} = require('../Controller/ProductController');
const verifyToken = require('../middlewares/Token/verifyToken');

const ProductRoutes = require('express').Router();

// Product routes
ProductRoutes
    .post('/create', verifyToken, CreateProduct)              
    .get('/all-products', GetAllProducts)                     
    .get('/:id', GetProductDetails)                           
    .put('/update/:id', verifyToken, UpdateProduct)             
    .delete('/delete/:id', verifyToken, DeleteProduct)        
    .patch('/approve/:id', verifyToken, ApproveProduct)        
    .patch('/make-featured/:id', verifyToken, MakeFeaturedProduct);

module.exports = ProductRoutes;
