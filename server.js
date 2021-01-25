'use strict';

//Imports 
const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const path = require('path');
const passport = require('passport');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const PORT = process.env.PORT || 3000; 
require('./Auth/passportSetup.js');
const { ensureAuth , ensureGuest } = require('./Middleware/authenticate.js'); // destructing and calling 2 exports [0 ,1]


// Define All Required Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser('session_cookie_secret')); 
app.use(session({
  secret: "session_secret",
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  },
}))
app.use(passport.initialize());
app.use(passport.session());



//Api Routes [GET] - PRODUCTS
app.get('/GetAllProducts',require('./routes/ProductController.js'));
app.get('/GetProduct/:id',require('./routes/ProductController.js'));

//Api Routes - Orders 

// [GET ORDERS]
app.get('/GetOrderById/:id',require('./routes/OrdersController.js'));

// [POST ORDERS] 
app.post('/PlaceOrder',require('./routes/OrdersController.js'));

// [Put ORDERS] 
app.put('/ConfirmOrder',require('./routes/OrdersController.js'));



// Ensuring Authentication for Main Pages

app.get('/',ensureAuth,(req, res)=>{
    res.redirect('/home-page.html');
})
app.get('/home-page.html',ensureAuth,(req, res)=>{
    res.sendFile(__dirname + "/public/home-page.html");
})
app.get('/checkout-page.html',ensureAuth,(req, res)=>{
    res.sendFile(__dirname + "/public/checkout-page.html");
})
app.get('/invoice.html',ensureAuth,(req, res)=>{
    res.sendFile(__dirname + "/public/invoice.html");
})


//Login and Authentication Routes

app.get('/auth/google/failure',(req, res)=>{
    res.send("Failed to Login");
})

app.get('/auth/google/success',(req, res)=>{
    res.redirect('/home-page.html');
})

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}));

app.get('/getCurrentAdmin',ensureAuth,(req, res)=>{
    const currentAdmin = req.session.passport.user.displayName;
    res.json({admin: currentAdmin});
})

// @desc Logout Route 

app.get('/Logout',(req, res)=>{
    req.session.destroy();
    req.logout();
    res.redirect('/login.html');
  })


app.use(express.static(path.join(__dirname, '/public')))

// Listen to Port 
app.listen(PORT, () => {
    console.log(`Billing App Running on Port ${PORT}`);
})