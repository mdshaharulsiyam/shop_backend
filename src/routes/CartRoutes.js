
const { CreateOrUpdateCart, GetAllCarts, UpdateCart, DeleteCart } = require('../Controller/CartController');
const verifyToken = require('../middlewares/Token/verifyToken');
const CartRoutes = require('express').Router();

CartRoutes.post('/create-or-update', verifyToken, CreateOrUpdateCart)
    .get('/all', verifyToken, GetAllCarts)
    .put('/update/:id', verifyToken, UpdateCart)
    .delete('/delete/:id', verifyToken, DeleteCart);

module.exports = CartRoutes;
