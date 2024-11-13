const { Schema, model } = require('mongoose');

const CategorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        unique: true,
    },
    img: {
        type: String,
        required: false
    },
    totalSubCategory: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });

const CategoryModel = model('category', CategorySchema);
module.exports = CategoryModel