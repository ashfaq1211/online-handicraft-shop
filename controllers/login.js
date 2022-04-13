const UserModel = require('../models/user');

async function login(payload) {
    try {
        const existingUser = await UserModel.findOne({
            'email': payload.email,
            'password': payload.password
        });

        if (existingUser) {
            console.log('Here');
            return { status: 200, message: 'Logged In Successfully!', data: existingUser };
        } else {
            return { status: 400, message: 'Incorrect Credentials', data: null };
        }
    } catch(err) {
        console.log('Login User => ', err);
    }
};

module.exports = login;