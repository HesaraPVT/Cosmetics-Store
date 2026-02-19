import mongoose from "mongoose"

const productSchema = mongoose.Schema( //schema for product collection
    {
        productId: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        altNames: {
            type: [String],
        },
        images: {
            type: [String],
            required: false
        },
        description: {
            type: String
        },
        labeledPrice: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        stock: {
            type: Number,
            required: true
        },
        isAvailable: {
            type: Boolean,
            default: true
    }
})

const Product = mongoose.model('Products', productSchema); //model for product collection

export default Product;