const { Schema, model } = require('mongoose');

const WebsiteSettingSchema = new Schema({
    siteName: { type: String, required: [true, 'Site name is required'] },
    logo: { type: String, required: [true, 'Logo is required'] },
    favicon: { type: String, required: [false, 'Favicon is required'] },
    contactEmail: { type: String, required: [true, 'Contact email is required'] },
    contactPhone: { type: String, required: false },
    address: {
        type: String,
        required: [false, 'Address is required ']
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: [false, 'Address coordinate is required']
        }
    },
    socialMedia: {
        facebook: { type: String, required: false },
        twitter: { type: String, required: false },
        instagram: { type: String, required: false },
        linkedin: { type: String, required: false },
    },
    appearance: {
        primaryColor: { type: String, default: '#000000' },
        secondaryColor: { type: String, default: '#FFFFFF' },
        theme: { type: String, enum: ['light', 'dark'], default: 'light' }
    },
    seo: {
        metaTitle: { type: String, required: false },
        metaDescription: { type: String, required: false },
        metaKeywords: { type: [String], required: false },
    },
    currency: {
        symbol: { type: String, default: '$' },
        code: { type: String, default: 'USD' }
    },
    tax: {
        isEnabled: { type: Boolean, default: false },
        rate: { type: Number, default: 0 }
    },
    shipping: {
        freeShippingThreshold: { type: Number, default: 0 },
        standardRate: { type: Number, default: 5 }
    },
    maintenanceMode: { type: Boolean, default: false },
    autoApproveShop: { type: Boolean, required: false, default: false },
    autoApproveProduct: { type: Boolean, required: false, default: false },
    shopRequest: { type: Boolean, default: true },
    makeAdmin: { type: Boolean, default: true }
}, { timestamps: true });
WebsiteModel.index({ location: "2dsphere" });
const WebsiteModel = model('websiteSetting', WebsiteSettingSchema);
module.exports = WebsiteModel