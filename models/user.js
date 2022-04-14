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
    cartItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    }],
    purchasedItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    }]
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;