const { CreateShopRequest, GetAllShops, UpdateShop, DeleteShop, BlockShop } = require('../Controller/ShopController');
const verifyToken = require('../middlewares/Token/verifyToken');

const ShopRoutes = require('express').Router()
ShopRoutes.post('/create-request', CreateShopRequest)
    .get('/all-shop', GetAllShops)
    .put('/update/:id', verifyToken, UpdateShop)
    .delete('/delete/:id', verifyToken, DeleteShop)
    .patch('/block/:id', verifyToken(['admin', 'super admin']), BlockShop);

module.exports = ShopRoutes