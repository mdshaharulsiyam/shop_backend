const { CreateShippingAddress, GetAllShippingAddresses, GetNearbyAddresses, UpdateShippingAddress, DeleteShippingAddress } = require('../Controller/ShippingAddressController');
const verifyToken = require('../middlewares/Token/verifyToken');

const ShippingAddressRoutes = require('express').Router();

ShippingAddressRoutes.post('/create', verifyToken, CreateShippingAddress)
    .get('/all', verifyToken, GetAllShippingAddresses)
    .get('/nearby', verifyToken, GetNearbyAddresses) 
    .put('/update/:id', verifyToken, UpdateShippingAddress)
    .delete('/delete/:id', verifyToken, DeleteShippingAddress);

module.exports = ShippingAddressRoutes;
