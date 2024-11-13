const ProductModel = require('../models/ProductModel');
const globalErrorHandler = require("../utils/globalErrorHandler");
const Queries = require('../utils/Queries');

// Create a new product
const CreateProduct = async (req, res, next) => {
    try {
        const data = req.body;
        const product = await ProductModel.create(data);
        res.status(201).send({ success: true, message: 'Product created successfully', data: product });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'Product');
    }
};

// Get all products with pagination, sorting, and search
const GetAllProducts = async (req, res, next) => {
    try {
        const queryKeys = {
            limit: req.query.limit,
            page: req.query.page,
            sort: req.query.sort,
            order: req.query.order,
            ...req.query
        };
        const searchKeys = {
            'name': req.query.name || '',
            'category': req.query.category || '',
            'subCategory': req.query.subCategory || '',
            'shop': req.query.shop || ''
        };
        const populatePath = ['category', 'subCategory', 'shop'];
        const selectFields = ''; // Specify fields if needed

        const products = await Queries(ProductModel, queryKeys, searchKeys, populatePath, selectFields);
        res.status(200).json(products);
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'Product');
    }
};

// Get product details by ID
const GetProductDetails = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findById(id).populate('category subCategory shop');

        if (!product) {
            return res.status(404).send({ success: false, message: 'Product not found' });
        }

        res.status(200).send({ success: true, data: product });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'Product');
    }
};

// Update a product by ID
const UpdateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const updatedProduct = await ProductModel.findByIdAndUpdate(id, data, { new: true });
        if (!updatedProduct) {
            return res.status(404).send({ success: false, message: 'Product not found' });
        }

        res.status(200).send({ success: true, message: 'Product updated successfully', data: updatedProduct });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'Product');
    }
};

// Delete a product by ID
const DeleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedProduct = await ProductModel.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).send({ success: false, message: 'Product not found' });
        }

        res.status(200).send({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'Product');
    }
};

// Approve a product by ID
const ApproveProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        const approvedProduct = await ProductModel.findByIdAndUpdate(id, { isApproved: true }, { new: true });
        if (!approvedProduct) {
            return res.status(404).send({ success: false, message: 'Product not found' });
        }

        res.status(200).send({ success: true, message: 'Product approved successfully', data: approvedProduct });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'Product');
    }
};

// Mark a product as featured
const FeatureProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        const featuredProduct = await ProductModel.findByIdAndUpdate(id, { isFeatured: true }, { new: true });
        if (!featuredProduct) {
            return res.status(404).send({ success: false, message: 'Product not found' });
        }

        res.status(200).send({ success: true, message: 'Product marked as featured', data: featuredProduct });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'Product');
    }
};

module.exports = {
    CreateProduct,
    GetAllProducts,
    GetProductDetails,
    UpdateProduct,
    DeleteProduct,
    ApproveProduct,
    FeatureProduct
};
