"use strict";

const express = require('express');
const router = express.Router();
const { GetAllProducts , GetSingleProduct } = require('../models/products.js');
const db = require('../DB/config.js');


router.get('/GetAllProducts', async (req, res) => {

    try{
        const GetAllProduct = await GetAllProducts();
        if(GetAllProduct != null && GetAllProduct != 'Not Found' && GetAllProduct != ''){
            console.log("<------------------------------->");
            res.status(200).json(GetAllProduct);
        }else{
            res.status(200).json({"message":"Data Not Found"})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }


});

router.get('/GetProduct/:id', async (req, res) => {

    try{
        const GetSingleProductById = await GetSingleProduct(req.params.id);
        if(GetSingleProductById != null && GetSingleProductById != 'Not Found' && GetSingleProductById != ''){
            console.log("<------------------------------->");
            res.status(200).json(GetSingleProductById);
        }else{
            console.log("error");
            res.status(200).json({"message":"Data Not Found"})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }


});



module.exports = router;
   