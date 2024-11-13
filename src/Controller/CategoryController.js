const CategoryModel = require("../Models/CategoryModel");
const globalErrorHandler = require("../utils/globalErrorHandler");

const CreateCategory = async (req, res, next) => {
    try {
        const data = req.body;
        const category = await CategoryModel.create(data);
        res.status(201).send({ success: true, message: 'Category created successfully', data: category });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'Category');
    }
};

// Get all categories
const GetAllCategories = async (req, res, next) => {
    try {
        const categories = await CategoryModel.find();
        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'Category');
    }
};

// Update a category by ID
const UpdateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedCategory = await CategoryModel.findByIdAndUpdate(id, data, { new: true });
        if (!updatedCategory) {
            return res.status(404).send({ success: false, message: 'Category not found' });
        }
        res.status(200).send({ success: true, message: 'Category updated successfully', data: updatedCategory });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'Category');
    }
};

// Delete a category by ID
const DeleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedCategory = await CategoryModel.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).send({ success: false, message: 'Category not found' });
        }
        res.status(200).send({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'Category');
    }
};

// Toggle category active status
const ToggleCategoryStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await CategoryModel.findById(id);
        if (!category) {
            return res.status(404).send({ success: false, message: 'Category not found' });
        }
        category.isActive = !category.isActive;
        await category.save();
        res.status(200).send({ success: true, message: `Category ${category.isActive ? 'activated' : 'deactivated'} successfully`, data: category });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'Category');
    }
};

module.exports = {
    CreateCategory,
    GetAllCategories,
    UpdateCategory,
    DeleteCategory,
    ToggleCategoryStatus
};
