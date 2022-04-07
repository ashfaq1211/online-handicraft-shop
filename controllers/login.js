const UserModel = require('../models/user');

async function signUp(payload) {
    try {
        const existingUser =await UserModel.findOne({
            'name': payload.name,
            'email': payload.email,
            'password': payload.password
        });

        if (existingUser) {
            // SESSION CREATION LOGIC
            return { status: 200, message: 'Logged In Successfully!', data: null };
        } else {
            return { status: 400, message: 'Incorrect Credentials', data: user };
        }
    } catch(err) {
        console.log('Login User => ', err);
    }
};

module.exports = signUp;