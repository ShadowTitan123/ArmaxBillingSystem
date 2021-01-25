'use strict';

//Imports 
const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const PORT = process.env.PORT || 3000; 



//Define Middleware to Access Static Files and Parse Json Bodies
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.json())



app.get('/',(req, res)=>{
    res.redirect('/home-page.html');
})

// Listen to Port 
app.listen(PORT, () => {
    console.log(`Billing App Running on Port ${PORT}`);
})