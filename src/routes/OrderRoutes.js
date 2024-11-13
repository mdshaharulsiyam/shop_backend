const verifyToken = require('../middlewares/Token/verifyToken');
const { CreateOrder, GetAllOrders, UpdateOrder, DeleteOrder, UpdateDeliveryStatus } = require('../Controller/OrderController');

const OrderRoutes = require('express').Router();

OrderRoutes.post('/create', verifyToken, CreateOrder)
    .get('/all', verifyToken, GetAllOrders)
    .put('/update/:id', verifyToken, UpdateOrder)
    .delete('/delete/:id', verifyToken, DeleteOrder)
    .patch('/update-delivery-status/:id', verifyToken, UpdateDeliveryStatus);

module.exports = OrderRoutes;
