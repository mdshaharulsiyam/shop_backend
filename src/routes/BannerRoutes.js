
const { UpdateBanner, CreateBanner, DeleteBanner, ToggleBannerStatus } = require('../Controller/BannerController');
const verifyToken = require('../middlewares/Token/verifyToken');

const BannerRoutes = require('express').Router();

BannerRoutes.post('/create', verifyToken, CreateBanner)
    .get('/all', GetAllBanners)
    .put('/update/:id', verifyToken, UpdateBanner)
    .delete('/delete/:id', verifyToken, DeleteBanner)
    .patch('/toggle-status/:id', verifyToken, ToggleBannerStatus);

module.exports = BannerRoutes;
