
const globalErrorHandler = require('../utils/globalErrorHandler');
const Queries = require('../utils/Queries');
const OrderModel = require("../Models/OrderModel");
const CreateOrder = async (req, res, next) => {
    try {
        const { user, items, totalAmount, discount, finalAmount, deliveryAddress, paymentMethod, notes } = req.body;

        const orderData = {
            user,
            items,
            totalAmount,
            discount,
            finalAmount,
            deliveryAddress,
            paymentMethod,
            notes
        };

        const order = await OrderModel.create(orderData);
        res.status(201).send({ success: true, message: 'Order created successfully', data: order });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'Order');
    }
};

// Get all orders with pagination, sorting, and search
const GetAllOrders = async (req, res, next) => {
    try {
        const queryKeys = {
            limit: req.query.limit,
            page: req.query.page,
            sort: req.query.sort,
            order: req.query.order,
            ...req.query
        };
        const searchKeys = {
            'user': req.query.user || '',
            'paymentStatus': req.query.paymentStatus || '',
            'deliveryStatus': req.query.deliveryStatus || ''
        };
        const populatePath = ['user', 'items.product', 'deliveryAddress', 'assignedRider'];
        const selectFields = ''; // Define specific fields if needed

        const orders = await Queries(OrderModel, queryKeys, searchKeys, populatePath, selectFields);
        res.status(200).json(orders);
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'Order');
    }
};

// Update an order by ID
const UpdateOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const updatedOrder = await OrderModel.findByIdAndUpdate(id, data, { new: true });
        if (!updatedOrder) {
            return res.status(404).send({ success: false, message: 'Order not found' });
        }

        res.status(200).send({ success: true, message: 'Order updated successfully', data: updatedOrder });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'Order');
    }
};

// Delete an order by ID
const DeleteOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedOrder = await OrderModel.findByIdAndDelete(id);

        if (!deletedOrder) {
            return res.status(404).send({ success: false, message: 'Order not found' });
        }

        res.status(200).send({ success: true, message: 'Order deleted successfully' });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'Order');
    }
};

// Update delivery status of an order
const UpdateDeliveryStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { deliveryStatus } = req.body;

        const updatedOrder = await OrderModel.findByIdAndUpdate(id, { deliveryStatus }, { new: true });
        if (!updatedOrder) {
            return res.status(404).send({ success: false, message: 'Order not found' });
        }

        res.status(200).send({ success: true, message: 'Delivery status updated successfully', data: updatedOrder });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'Order');
    }
};

module.exports = {
    CreateOrder,
    GetAllOrders,
    UpdateOrder,
    DeleteOrder,
    UpdateDeliveryStatus
};
