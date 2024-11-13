const { Schema, model } = require('mongoose');

const OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'Customer reference is required']
    },
    items: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'product',
            required: [true, 'Product is required']
        },
        quantity: {
            type: Number,
            required: [true, 'Quantity is required'],
            min: 1
        },
        size: {
            type: String,
            required: [false, 'Size is required'],
        },
        color: {
            type: String,
            required: [false, 'color is required'],
        },
    }],
    totalAmount: {
        type: Number,
        required: [true, 'Total amount is required']
    },
    discount: {
        type: Number,
        default: 0
    },
    finalAmount: {
        type: Number,
        required: [true, 'Final amount is required']
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed', 'refunded'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        enum: ['credit_card', 'paypal', 'bank_transfer', 'cash_on_delivery'],
        default: 'cash_on_delivery'
    },
    deliveryStatus: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'out_for_delivery', 'delivered', 'canceled', 'returned'],
        default: 'pending'
    },
    deliveryAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    assignedRider: {
        type: Schema.Types.ObjectId,
        ref: 'Rider',
        required: false
    },
    estimatedDeliveryDate: {
        type: Date,
        required: false
    },
    deliveredAt: {
        type: Date
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    canceledAt: {
        type: Date
    },
    notes: {
        type: String,
        required: false,
        trim: true
    }
}, { timestamps: true });

const OrderModel = model('order', OrderSchema);
module.exports = OrderModel
