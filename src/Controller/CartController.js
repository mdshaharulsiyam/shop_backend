
const CartModel = require("../Models/CartModel");
const globalErrorHandler = require("../utils/globalErrorHandler");
const Queries = require('../utils/Queries');

// Create a new cart or update an existing cart for a user
const CreateOrUpdateCart = async (req, res, next) => {
    try {
        const { userId, items } = req.body;

        // Calculate total quantity and total price
        const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
        const totalPrice = items.reduce((acc, item) => acc + item.quantity * item.price, 0);

        let cart = await CartModel.findOne({ userId });
        if (cart) {
            // Update existing cart
            cart.items = items;
            cart.totalQuantity = totalQuantity;
            cart.totalPrice = totalPrice;
            await cart.save();
        } else {
            // Create new cart
            cart = await CartModel.create({ userId, items, totalQuantity, totalPrice });
        }

        res.status(201).send({ success: true, message: 'Cart created/updated successfully', data: cart });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'Cart');
    }
};

// Get all carts with pagination, sorting, and search
const GetAllCarts = async (req, res, next) => {
    try {
        const queryKeys = {
            limit: req.query.limit,
            page: req.query.page,
            sort: req.query.sort,
            order: req.query.order,
            ...req.query
        };
        const searchKeys = {
            'userId': req.query.userId || ''
        };
        const populatePath = 'items.productId'; // Populate product details for each item in the cart
        const selectFields = ''; // Define any specific fields to select from the population

        const carts = await Queries(CartModel, queryKeys, searchKeys, populatePath, selectFields);
        res.status(200).json(carts);
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'Cart');
    }
};

// Update a cart by ID
const UpdateCart = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const updatedCart = await CartModel.findByIdAndUpdate(id, data, { new: true });
        if (!updatedCart) {
            return res.status(404).send({ success: false, message: 'Cart not found' });
        }

        res.status(200).send({ success: true, message: 'Cart updated successfully', data: updatedCart });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'Cart');
    }
};

// Delete a cart by ID
const DeleteCart = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedCart = await CartModel.findByIdAndDelete(id);

        if (!deletedCart) {
            return res.status(404).send({ success: false, message: 'Cart not found' });
        }

        res.status(200).send({ success: true, message: 'Cart deleted successfully' });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'Cart');
    }
};

module.exports = {
    CreateOrUpdateCart,
    GetAllCarts,
    UpdateCart,
    DeleteCart
};
