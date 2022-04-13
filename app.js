const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const UserModel = require('./models/user');
const singUp = require('./controllers/signUp')
const login = require('./controllers/login')

app.set('view engine', 'ejs');
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// root route
app.get('/', (req, res) => {
    if (req.session.loggedin) {
        res.render('home', { isLoggedIn: true, email: req.session.email } );
    } else {
        res.render('home', { isLoggedIn: false, email: null });
    }
});

// without status param
app.get('/getSignUpForm', async (req, res) => {
    res.render('signup-form', { status: null });
});
// with status param
app.get('/getSignUpForm/:status', async (req, res) => {
    console.log(req.params.status);
    if (req.params.status == 400 || '400') {
        res.render('signup-form', { status: req.params.status });
    }
});

//
app.post('/postSignUpForm', async (req, res) => {
    console.log(req.body);
    const data = await singUp(req.body);
    console.log(data);
    if (data && data.status == 200) {
        res.redirect('/getLoginForm');
    } else if (data) {
        res.redirect(`/getSignUpForm/${data.status}`);
    }
});

app.get('/getLoginForm', async (req, res) => {
    res.render('login-form');
});

app.post('/postLoginForm', async (req, res) => {
    const data = await login(req.body);
    console.log(data);
    if (data.status == 200) {
        req.session.loggedin = true;
		req.session.email = req.body.email;
        res.redirect('/home');
        // res.redirect('/shopHome');
    } else {
        // res.send('Please enter correct credentials to login!');
        res.redirect('/getLoginForm');
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