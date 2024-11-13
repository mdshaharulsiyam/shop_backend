const { Schema, model } = require('mongoose');

const ShippingAddressSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    address: {
        type: String,
        required: [true, 'Street is required'],
        trim: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
            required: true
        },
        coordinates: {
            type: [Number],
            required: true,
            validate: {
                validator: function (value) {
                    return value.length === 2;
                },
                message: 'Coordinates must contain exactly two values: [longitude, latitude]'
            }
        }
    },
}, { timestamps: true });

ShippingAddressSchema.index({ location: '2dsphere' });

const ShippingAddressModel = model('shippingAddress', ShippingAddressSchema);
module.exports = ShippingAddressModel
