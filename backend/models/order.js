import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderId : {
        type: String,
        required: true,
        unique: true
    },
    email : {
        type: String,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    phone : {
        type: String,
        required: true  
    },
    address : {
        type: String,
        required: true
    },
    status : {
        type: String,
        required: true,
        default: "pending"
    },
<<<<<<< HEAD:backend/models/order.js
    total : {
        type: Number,
        required: true
    },
    labelledTotal : {
        type: Number
=======
    labelledTotal : {
        type: Number,
        required: true
    },
    total : {
        type: Number,
        required: true
>>>>>>> aabace302b75706cef5f910c7da0666560155008:models/order.js
    },
    products : [{
        productInfo : {
            productId: {
                type: String,
                required: true  
            },
            name: {
                type: String,
                required: true
            },
            altNames: {
<<<<<<< HEAD:backend/models/order.js
                type: [String]
=======
                type: [String],
>>>>>>> aabace302b75706cef5f910c7da0666560155008:models/order.js
            },
            description: {
                type: String,
                required: true
            },
            labeledPrice: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
<<<<<<< HEAD:backend/models/order.js
            },
            stock: {
                type: Number,
                required: true
            },
            images: {
                type: [String]
=======
>>>>>>> aabace302b75706cef5f910c7da0666560155008:models/order.js
            }
        },
        quantity : {
            type: Number,
            required: true
<<<<<<< HEAD:backend/models/order.js
        }
=======
        },
>>>>>>> aabace302b75706cef5f910c7da0666560155008:models/order.js
    }],
    Date : {
        type: Date,
        default: Date.now
    }
});

<<<<<<< HEAD:backend/models/order.js
const Order = mongoose.model('orders', orderSchema);

export default Order;
=======
const Order = mongoose.model('Orders', orderSchema);

export default Order;
>>>>>>> aabace302b75706cef5f910c7da0666560155008:models/order.js
