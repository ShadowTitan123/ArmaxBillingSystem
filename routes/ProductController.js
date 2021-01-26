"use strict";

const express = require('express');
const router = express.Router();
const { GetAllProducts , GetSingleProduct , AddProduct , UpdateProduct , DeleteProduct } = require('../models/products.js');
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

router.post('/AddProduct', async (req, res) => {

    try {
        const AddProducts = await AddProduct(req.body.ptitle, req.body.type, req.body.price);
        if (AddProducts.status === true) {
            console.log("Product Details Inserted into DB");
            console.log("<------------------------------->");
            res.status(200).json({ "message": "Product Added successfully", "status":true  });
        } else {
            console.log("Data Failed to Insert in DB");
            res.status(500).json({ "message": "Error Inserting Data","status":false });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);  
    }
});

router.put('/UpdateProduct', async (req, res) => {

    try {
        const UpdateProducts = await UpdateProduct(req.body.Name, req.body.Type,req.body.Price,req.body.AlertID);
        if (UpdateProducts.status === true) {
            console.log("Product Updated");
            console.log("<------------------------------->");
            res.status(200).json({ "message": "Product Updated successfully", "status":true});
        } else {
            console.log("Data Failed to Insert in DB");
            res.status(500).json({ "message": "Error Updating Data","status":false });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);  
    }
});

router.delete('/DeleteProduct', async (req, res) => {

    try {
        const DeleteProducts = await DeleteProduct(req.body.alertId);
        if (DeleteProducts.status === true) {
            console.log("Product Updated");
            console.log("<------------------------------->");
            res.status(200).json({ "message": "Product Deleted successfully", "status":true});
        } else {
            console.log("Data Failed to Delete in DB");
            res.status(500).json({ "message": "Error Deleting Data","status":false });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);  
    }
});




module.exports = router;
   