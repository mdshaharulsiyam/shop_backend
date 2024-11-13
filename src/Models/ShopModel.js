const { model, Schema } = require('mongoose');
const ShopSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: [true, 'user is required '],
        ref: 'auth'
    },
    name: {
        type: String,
        required: [true, 'shop name is required ']
    },
    logo: {
        type: String,
        required: [false, 'shop logo is required ']
    },
    banner: {
        type: String,
        required: [true, 'shop banner is required ']
    },
    address: {
        type: String,
        required: [true, 'shop Address is required ']
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: [true, 'shop coordinate is required'],
            validate: {
                validator: function (value) {
                    return value.length === 2;
                },
                message: 'Coordinates must contain exactly two values: [longitude, latitude]'
            }
        }
    },
    block: {
        type: Boolean,
        default: false
    },
    isApprove: {
        type: Boolean,
        default: false
    },
    totalProducts: {
        type: Number,
        default: 0
    },
    tradeLicense: {
        type: String,
        default: null
    },
    shopType: {
        type: String,
        default: 'shop'
    }

})
ShopSchema.index({ location: "2dsphere" });
const ShopModel = model('shop', ShopSchema);
module.exports = ShopModel