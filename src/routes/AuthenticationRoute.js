
const { SignUp, SignIn, UpdateUser, ChangePassword, SendVerifyEmail, VerifyCode, ResetPassword, GetProfile, DeleteAccount, AdminGetAllUser, ActiveAccount, } = require('../Controller/AuthenticationController');
const { upload } = require('../middlewares/FileUpload/CloudnaryFileUpload');
const ActivationToken = require('../middlewares/Token/ActivationToken');
const verifyToken = require('../middlewares/Token/verifyToken');
const AuthRoute = require('express').Router()

AuthRoute.post('/sign-up', SignUp)
    .post('/sign-in', SignIn)
    .post('/send-verify-email', SendVerifyEmail)
    .post('/verify-code', VerifyCode)
    .post('/reset-password', ActivationToken, ResetPassword)
    .post('/active-account', ActivationToken, ActiveAccount)
    .patch('/update-user', verifyToken, upload.single('img'), UpdateUser)
    .patch('/change-password', verifyToken, ChangePassword)
    .get('/profile', verifyToken, GetProfile)
    .delete('/delete-account', verifyToken, DeleteAccount)
    .get('/admin-get-all-user', verifyToken,AdminGetAllUser)

module.exports = AuthRoute

// upload.array("files", 10),
// const uploadPromises = req.files.map(file => uploadToCloudinary(file));
// const results = await Promise.all(uploadPromises);


// upload.single("file"),
// const result = await uploadToCloudinary(req.file);