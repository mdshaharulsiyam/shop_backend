const SubCategoryModel = require("../Models/SubCategoryModel");
const globalErrorHandler = require("../utils/globalErrorHandler");

// Create a new subcategory
const CreateSubCategory = async (req, res, next) => {
    try {
        const data = req.body;
        const subCategory = await SubCategoryModel.create(data);
        res.status(201).send({ success: true, message: 'Subcategory created successfully', data: subCategory });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'SubCategory');
    }
};

// Get all subcategories
const GetAllSubCategories = async (req, res, next) => {
    try {
        const subCategories = await SubCategoryModel.find();
        res.status(200).json({ success: true, data: subCategories });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'SubCategory');
    }
};

// Update a subcategory by ID
const UpdateSubCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedSubCategory = await SubCategoryModel.findByIdAndUpdate(id, data, { new: true });
        if (!updatedSubCategory) {
            return res.status(404).send({ success: false, message: 'Subcategory not found' });
        }
        res.status(200).send({ success: true, message: 'Subcategory updated successfully', data: updatedSubCategory });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'SubCategory');
    }
};

// Delete a subcategory by ID
const DeleteSubCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedSubCategory = await SubCategoryModel.findByIdAndDelete(id);
        if (!deletedSubCategory) {
            return res.status(404).send({ success: false, message: 'Subcategory not found' });
        }
        res.status(200).send({ success: true, message: 'Subcategory deleted successfully' });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'SubCategory');
    }
};

// Toggle subcategory active status
const ToggleSubCategoryStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const subCategory = await SubCategoryModel.findById(id);
        if (!subCategory) {
            return res.status(404).send({ success: false, message: 'Subcategory not found' });
        }
        subCategory.isActive = !subCategory.isActive;
        await subCategory.save();
        res.status(200).send({ success: true, message: `Subcategory ${subCategory.isActive ? 'activated' : 'deactivated'} successfully`, data: subCategory });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'SubCategory');
    }
};

module.exports = {
    CreateSubCategory,
    GetAllSubCategories,
    UpdateSubCategory,
    DeleteSubCategory,
    ToggleSubCategoryStatus
};
