const { Schema, model } = require('mongoose');

const BannerSchema = new Schema({
    img: {
        type: String,
        required: [true, 'Banner image URL is required']
    },
    link: {
        type: String,
        required: false,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    startDate: {
        type: Date,
        required: false
    },
    endDate: {
        type: Date,
        required: false
    },
}, { timestamps: true });

module.exports = model('Banner', BannerSchema);
