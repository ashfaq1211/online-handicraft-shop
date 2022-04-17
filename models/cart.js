const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    totalDiscount: {
        type: Number,
        required: true
    },
    shippingFee: {
        type: Number,
        default: 50,
        required: true
    },
});

const CartModel = mongoose.model("cart", CartSchema);

module.exports = CartModel;