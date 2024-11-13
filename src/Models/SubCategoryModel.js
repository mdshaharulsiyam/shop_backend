const { Schema, model } = require('mongoose');

const SubCategorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        unique: true,
    },
    img: {
        type: String,
        required: false
    },
    totalProduct: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });
const SubCategoryModel = model('subCategory', SubCategorySchema);
module.exports = SubCategoryModel