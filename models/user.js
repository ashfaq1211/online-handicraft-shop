const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        default: 'customer'
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cart'
    },
    orders: [{
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
    }]
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;