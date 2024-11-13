const { CreateProduct, GetAllProducts, GetProductDetails, UpdateProduct, DeleteProduct, ApproveProduct, FeatureProduct } = require('../Controller/ProductController');
const verifyToken = require('../middlewares/Token/verifyToken');

const ProductRoutes = require('express').Router();

ProductRoutes.post('/create', verifyToken, CreateProduct)
    .get('/all', GetAllProducts)
    .get('/details/:id', GetProductDetails)
    .put('/update/:id', verifyToken, UpdateProduct)
    .delete('/delete/:id', verifyToken, DeleteProduct)
    .patch('/approve/:id', verifyToken, ApproveProduct)
    .patch('/feature/:id', verifyToken, FeatureProduct); 

module.exports = ProductRoutes;
