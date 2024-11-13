const { uploadToCloudinary } = require('../middlewares/FileUpload/CloudnaryFileUpload');
const Shop = require('../models/Shop'); // Import the Shop model
const ShopModel = require('../Models/ShopModel');
const globalErrorHandler = require("../utils/globalErrorHandler");
const Queries = require('../utils/Queries');
// Create a shop request
const CreateShopRequest = async (req, res, next) => {
    try {
        let data = req.body;
        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file);
            data.logo = uploadResult.url;
        }
        const shop = await ShopModel.create(data);
        res.status(201).send({ success: true, message: 'request for a shop account successful', data: shop });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'Shop');
    }
};

const GetAllShops = async (req, res, next) => {
    try {
        const queryKeys = {
            limit: req.query.limit,
            page: req.query.page,
            sort: req.query.sort,
            order: req.query.order,
            ...req.query
        };
        const searchKeys = {
            name: req.query.name || '',
            address: req.query.address || ''
        };
        const populatePath = 'user';
        const selectFields = '';
        const shops = await Queries(ShopModel, queryKeys, searchKeys, populatePath, selectFields);
        res.status(200).json(shops);
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'Shop');
    }
};

const UpdateShop = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { _id, access } = req.user;
        const userShop = await ShopModel.findOne({ user: _id })
        if (userShop?._id.toString() !== id || access < 3) {
            return res.status(403).send({ message: 'unauthorize access', success: false })
        }
        let data = req.body;
        const shop = await ShopModel.findById(id);
        if (req.file) {
            if (shop.logo) {
                deleteFileByUrl(shop.logo);
            }
            const uploadResult = await uploadToCloudinary(req.file);
            data.logo = uploadResult.url;
        }
        const updatedShop = await Shop.findByIdAndUpdate(id, data, { new: true });
        res.status(200).send({ success: true, message: 'Shop Updated Successfully', data: updatedShop });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'Shop');
    }
};

const DeleteShop = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { _id, access } = req.user;
        const userShop = await ShopModel.findOne({ user: _id })
        if (userShop?._id.toString() !== id || access < 3) {
            return res.status(403).send({ message: 'unauthorize access', success: false })
        }
        const shop = await ShopModel.findById(id);
        if (shop && shop.logo) {
            deleteFileByUrl(shop.logo);
        }
        await ShopModel.findByIdAndDelete(id);
        res.status(200).send({ success: true, message: 'Shop deleted successfully' });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'Shop');
    }
};
const BlockShop = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { _id, access } = req.user;
        if (access < 3) {
            return res.status(403).send({ message: 'unauthorize access', success: false })
        }
        const shop = await ShopModel.findById(id);
        if (shop && shop.logo) {
            deleteFileByUrl(shop.logo);
        }
        await ShopModel.findByIdAndUpdate(id, {
            $set: {
                block: true
            }
        });
        res.status(200).send({ success: true, message: 'Shop blocked successfully' });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'Shop');
    }
};

module.exports = {
    CreateShopRequest,
    GetAllShops,
    UpdateShop,
    DeleteShop,
    BlockShop
};
