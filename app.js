const express = require('express');
const app = express();
const port = 3000;
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const UserModel = require('./models/user');
const singUp = require('./controllers/signUp')

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

// root route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// test-form route
app.get('/getSignUpForm', async (req, res) => {
    const users = await UserModel.find({});
    res.render('signup-form', { users: users, status: null });
});
app.get('/getSignUpForm/:status', async (req, res) => {
    console.log(req.query);
    const users = await UserModel.find({});
    res.render('signup-form', { users: users, status: status });
});

//
app.post('/postSignUpForm', async (req, res) => {
    console.log(req.body);
    const data = singUp(req.body);

    if (data && data.status == 200) {
        res.redirect(`/getLoginForm/${data.status}`);
    } else if (data) {
        res.redirect(`/getSignUpForm/${data.status}`);
    }

});

mongoose.connect('mongodb://localhost:27017/shop',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});