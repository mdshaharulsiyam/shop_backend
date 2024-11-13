const stripe = require('../config/stripe');
const globalErrorHandler = require("../utils/globalErrorHandler");
const { uploadToCloudinary, deleteFileByUrl } = require('../middlewares/FileUpload/CloudnaryFileUpload');
const StripeAccountModel = require('../Models/StripeAccountModel');

// Create a new Stripe account with KYC document uploads
const CreateStripeAccount = async (req, res, next) => {
    try {
        const { name, email, address, dob } = req.body;
        const { kycFront, kycBack } = req.files;

        // Upload KYC documents to Cloudinary
        const kycFrontUpload = await uploadToCloudinary(kycFront[0]);
        const kycBackUpload = await uploadToCloudinary(kycBack[0]);

        // Create a new Stripe account
        const account = await stripe.accounts.create({
            type: 'custom',
            country: 'US',
            email: email,
            business_type: 'individual',
            individual: {
                first_name: name.split(' ')[0],
                last_name: name.split(' ')[1] || '',
                email: email,
                address: {
                    line1: address,
                },
                dob: {
                    day: new Date(dob).getUTCDate(),
                    month: new Date(dob).getUTCMonth() + 1,
                    year: new Date(dob).getUTCFullYear(),
                },
                verification: {
                    document: {
                        front: kycFrontUpload.id,
                        back: kycBackUpload.id,
                    },
                },
            },
            capabilities: {
                card_payments: { requested: true },
                transfers: { requested: true },
            },
        });

        // Save account information to the database
        const stripeAccount = await StripeAccountModel.create({
            name,
            email,
            user: req.user._id,
            stripeAccountId: account.id,
            kycFront: kycFrontUpload.url,
            kycBack: kycBackUpload.url,
            address,
            dob,
            accountInformation: {
                stripeAccountId: account.id,
                externalAccountId: null,
                status: account.charges_enabled,
            },
        });

        res.status(201).send({ success: true, message: 'Stripe account created successfully', data: stripeAccount });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'StripeAccount');
    }
};

// Update a Stripe account by ID with optional KYC document updates
const UpdateStripeAccount = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const account = await StripeAccountModel.findById(id);

        if (!account) {
            return res.status(404).send({ success: false, message: 'Stripe account not found' });
        }

        // Update KYC documents if new files are provided
        if (req.files.kycFront) {
            await deleteFileByUrl(account.kycFront);
            const kycFrontUpload = await uploadToCloudinary(req.files.kycFront[0]);
            data.kycFront = kycFrontUpload.url;
        }
        if (req.files.kycBack) {
            await deleteFileByUrl(account.kycBack);
            const kycBackUpload = await uploadToCloudinary(req.files.kycBack[0]);
            data.kycBack = kycBackUpload.url;
        }

        const updatedAccount = await StripeAccountModel.findByIdAndUpdate(id, data, { new: true });
        res.status(200).send({ success: true, message: 'Stripe account updated successfully', data: updatedAccount });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'StripeAccount');
    }
};

// Delete a Stripe account by ID, along with associated KYC documents
const DeleteStripeAccount = async (req, res, next) => {
    try {
        const { id } = req.params;
        const account = await StripeAccountModel.findById(id);

        if (!account) {
            return res.status(404).send({ success: false, message: 'Stripe account not found' });
        }

        // Delete KYC documents from Cloudinary
        await deleteFileByUrl(account.kycFront);
        await deleteFileByUrl(account.kycBack);

        // Delete the Stripe account from Stripe and remove it from the database
        await stripe.accounts.del(account.stripeAccountId);
        await StripeAccountModel.findByIdAndDelete(id);

        res.status(200).send({ success: true, message: 'Stripe account deleted successfully' });
    } catch (error) {
        globalErrorHandler(error, req, res, next, 'StripeAccount');
    }
};

module.exports = {
    CreateStripeAccount,
    GetAllStripeAccounts,
    GetStripeAccountById,
    UpdateStripeAccount,
    DeleteStripeAccount
};
