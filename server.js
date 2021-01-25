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

app.use(cors());

//Define Middleware to Access Static Files and Parse Json Bodies
app.use(express.static(path.join(__dirname, '/public')))
// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(cookieParser('session_cookie_secret')); // any string ex: 'keyboard cat'

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



app.get('/',(req, res)=>{
    res.redirect('/login.html');
})

app.get('/auth/google/failure',(req, res)=>{
    res.send("failed to login");
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



//Api Routes [GET]
app.get('/GetAllProducts',require('./routes/ProductController.js'));
app.get('/GetProduct/:id',require('./routes/ProductController.js'));


//Api Routes [POST]
app.post('/PlaceOrder',require('./routes/OrdersController.js'));



// Listen to Port 
app.listen(PORT, () => {
    console.log(`Billing App Running on Port ${PORT}`);
})