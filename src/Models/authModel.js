const { model, Schema } = require('mongoose');
const HashPassword = require('../utils/HashPassword'); // Import the HashPassword function

// Define the User schema
const AuthSchema = new Schema({
    'img': {
        type: String,
        required: false,
        default: null
    },
    "name": {
        type: String,
        required: [true, 'name is required'],
    },
    "email": {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    "password": {
        type: String,
        required: [true, 'password is required'],
    },
    "provider": {
        type: String,
        required: true,
        enum:['credential','google'],
        default: 'credential'
    },
    "block": {
        type: Boolean,
        required: true,
        enum: [true, false],
        default: false
    },
    "isApproved": {
        type: Boolean,
        required: true,
        enum: [true, false],
        default: false
    },
    "role": {
        type: String,
        required: true,
        enum: ['USER','VENDOR', 'ADMIN','SUPER_ADMIN'],
        default: 'USER'
    },
    "access": {
        type: Number,
        required: true,
        enum: [0,1,2,3],
        default: 0,
    },
    phone: {
        type: Number,
        required: false,
        default: null
    },
}, { timestamps: true });

AuthSchema.pre('save', async function (next) {
    this.email = this.email.toLowerCase();
    if (this.isModified('password')) {
        try {
            this.password = await HashPassword(this.password);
        } catch (err) {
            return next(err);
        }
    }
    next();
});

const AuthModel = model('auth', AuthSchema);
module.exports = AuthModel;
