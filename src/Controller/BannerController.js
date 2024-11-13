const BannerModel = require("../Models/BannerModel");
const globalErrorHandler = require("../utils/globalErrorHandler");

const CreateBanner = async (req, res, next) => {
    try {
        const data = req.body;
        const banner = await BannerModel.create(data);
        res.status(201).send({ success: true, message: 'Banner created successfully', data: banner });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'Banner');
    }
};

// Get all banners
const GetAllBanners = async (req, res, next) => {
    try {
        const banners = await BannerModel.find();
        res.status(200).json({ success: true, data: banners });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'Banner');
    }
};

// Update a banner by ID
const UpdateBanner = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedBanner = await BannerModel.findByIdAndUpdate(id, data, { new: true });
        if (!updatedBanner) {
            return res.status(404).send({ success: false, message: 'Banner not found' });
        }
        res.status(200).send({ success: true, message: 'Banner updated successfully', data: updatedBanner });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'Banner');
    }
};

// Delete a banner by ID
const DeleteBanner = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedBanner = await BannerModel.findByIdAndDelete(id);
        if (!deletedBanner) {
            return res.status(404).send({ success: false, message: 'Banner not found' });
        }
        res.status(200).send({ success: true, message: 'Banner deleted successfully' });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'Banner');
    }
};

// Toggle banner active status
const ToggleBannerStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const banner = await BannerModel.findById(id);
        if (!banner) {
            return res.status(404).send({ success: false, message: 'Banner not found' });
        }
        banner.isActive = !banner.isActive;
        await banner.save();
        res.status(200).send({ success: true, message: `Banner ${banner.isActive ? 'activated' : 'deactivated'} successfully`, data: banner });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'Banner');
    }
};

module.exports = {
    CreateBanner,
    GetAllBanners,
    UpdateBanner,
    DeleteBanner,
    ToggleBannerStatus
};
