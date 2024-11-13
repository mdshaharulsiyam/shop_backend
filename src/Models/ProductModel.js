const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    name: { type: String, required: [true, 'Product Name is required'] },
    description: { type: String, required: [true, 'Description is required'] },
    price: { type: Number, required: [true, 'Price is required'] },
    discount: { type: Number, required: [false, 'Discount is required'] },
    coupon: {
        available: { type: Boolean, required: false },
        couponCode: {
            type: String,
            required: function () { return this.coupon.available; },
            validate: {
                validator: function (value) {
                    return this.coupon.available ? !!value : true;
                },
                message: 'Coupon code is required if coupon is available.'
            }
        },
    },
    img: {
        type: [String],
        required: [true, 'Product image is required'],
        validate: {
            validator: function (value) {
                return value.length <= 4;
            },
            message: 'A maximum of 4 images are allowed.'
        }
    },
    category: { type: Schema.Types.ObjectId, ref: 'category', required: true },
    subCategory: { type: Schema.Types.ObjectId, ref: 'subCategory', required: true },
    isApproved: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    stock: { type: Number, required: [true, 'Stock is required'] },
    shop: { type: Schema.Types.ObjectId, ref: 'shop', required: true }
}, { timestamps: true });

module.exports = model('product', ProductSchema);
