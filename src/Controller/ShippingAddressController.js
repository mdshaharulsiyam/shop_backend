const ShippingAddressModel = require('../models/ShippingAddressModel');
const globalErrorHandler = require("../utils/globalErrorHandler");

// Create a new shipping address
const CreateShippingAddress = async (req, res, next) => {
    try {
        const data = req.body;
        const address = await ShippingAddressModel.create(data);
        res.status(201).send({ success: true, message: 'Shipping address created successfully', data: address });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'ShippingAddress');
    }
};

// Get all shipping addresses for a user
const GetAllShippingAddresses = async (req, res, next) => {
    try {
        const { userId } = req.query;
        const addresses = await ShippingAddressModel.find({ user: userId });
        res.status(200).json({ success: true, data: addresses });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'ShippingAddress');
    }
};

// Get nearby shipping addresses
const GetNearbyAddresses = async (req, res, next) => {
    try {
        const { longitude, latitude, maxDistance = 5000 } = req.query; // Default max distance to 5 km

        const addresses = await ShippingAddressModel.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(longitude), parseFloat(latitude)]
                    },
                    $maxDistance: parseInt(maxDistance) // Distance in meters
                }
            }
        });

        res.status(200).send({ success: true, data: addresses });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'ShippingAddress');
    }
};

// Update a shipping address by ID
const UpdateShippingAddress = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const updatedAddress = await ShippingAddressModel.findByIdAndUpdate(id, data, { new: true });
        if (!updatedAddress) {
            return res.status(404).send({ success: false, message: 'Shipping address not found' });
        }

        res.status(200).send({ success: true, message: 'Shipping address updated successfully', data: updatedAddress });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'ShippingAddress');
    }
};

// Delete a shipping address by ID
const DeleteShippingAddress = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedAddress = await ShippingAddressModel.findByIdAndDelete(id);

        if (!deletedAddress) {
            return res.status(404).send({ success: false, message: 'Shipping address not found' });
        }

        res.status(200).send({ success: true, message: 'Shipping address deleted successfully' });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'ShippingAddress');
    }
};

module.exports = {
    CreateShippingAddress,
    GetAllShippingAddresses,
    GetNearbyAddresses,
    UpdateShippingAddress,
    DeleteShippingAddress
};
