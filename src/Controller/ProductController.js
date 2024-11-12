
const globalErrorHandler = require("../utils/globalErrorHandler");
const { uploadToCloudinary, deleteFileByUrl } = require('../middlewares/FileUpload/CloudnaryFileUpload');
const ProductModel = require("../Models/ProductModel");

// Create a new product
const CreateProduct = async (req, res, next) => {
    try {
        let data = req.body;
        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file);
            data.image = uploadResult.url;
        }
        const product = await ProductModel.create(data);
        res.status(201).send({ success: true, message: 'Product created successfully', data: product });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'Product');
    }
};

// Get all products
const GetAllProducts = async (req, res, next) => {
    try {
        const products = await ProductModel.find();
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'Product');
    }
};

// Get product details by ID
const GetProductDetails = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findById(id).populate('shop');
        if (!product) return res.status(404).send({ success: false, message: 'Product not found' });
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'Product');
    }
};

// Update product by ID
const UpdateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        let data = req.body;
        const product = await ProductModel.findById(id);
        if (!product) return res.status(404).send({ success: false, message: 'Product not found' });

        if (req.file) {
            if (product.image) {
                deleteFileByUrl(product.image);
            }
            const uploadResult = await uploadToCloudinary(req.file);
            data.image = uploadResult.url;
        }
        const updatedProduct = await ProductModel.findByIdAndUpdate(id, data, { new: true });
        res.status(200).send({ success: true, message: 'Product updated successfully', data: updatedProduct });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'Product');
    }
};

// Delete product by ID
const DeleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findById(id);
        if (product && product.image) {
            deleteFileByUrl(product.image);
        }
        await ProductModel.findByIdAndDelete(id);
        res.status(200).send({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'Product');
    }
};

// Approve product by ID
const ApproveProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const approvedProduct = await ProductModel.findByIdAndUpdate(id, { isApproved: true }, { new: true });
        if (!approvedProduct) return res.status(404).send({ success: false, message: 'Product not found' });
        res.status(200).send({ success: true, message: 'Product approved successfully', data: approvedProduct });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'Product');
    }
};
const MakeFeaturedProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const featuredProduct = await ProductModel.findByIdAndUpdate(id, { isFeatured: true }, { new: true });
        if (!featuredProduct) return res.status(404).send({ success: false, message: 'Product not found' });
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
    MakeFeaturedProduct
};
