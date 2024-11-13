const express = require('express');
const {
    CreateStripeAccount,
    UpdateStripeAccount,
    DeleteStripeAccount
} = require('../Controller/StripeAccountController');
const verifyToken = require('../middlewares/Token/verifyToken');
const { upload } = require('../middlewares/FileUpload/CloudnaryFileUpload');

const router = express.Router();

// Route to create a new Stripe account with KYC document uploads
router.post(
    '/create',
    verifyToken,
    upload.fields([{ name: 'kycFront', maxCount: 1 }, { name: 'kycBack', maxCount: 1 }]),
    CreateStripeAccount
)
// .get('/all', verifyToken, GetAllStripeAccounts)
// .get('/:id', verifyToken, GetStripeAccountById)
.put(
    '/update/:id',
    verifyToken,
    upload.fields([{ name: 'kycFront', maxCount: 1 }, { name: 'kycBack', maxCount: 1 }]),
    UpdateStripeAccount
)
.delete('/delete/:id', verifyToken, DeleteStripeAccount)
module.exports = router;
