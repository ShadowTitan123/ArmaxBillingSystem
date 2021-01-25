"use strict";

const express = require('express');
const router = express.Router();
const { CreateOrder , GetOrderById , ConfirmOrder} = require('../models/orders.js');
const db = require('../DB/config.js');


router.post('/PlaceOrder', async (req, res) => {

    try {
        const CreateOrders = await CreateOrder(req.body.firstName, req.body.LastName, req.body.Email, req.body.Address, req.body.Address2, req.body.Country, req.body.State, req.body.Zip, req.body.CardName, req.body.CreditCard, req.body.Expiration, req.body.CVV,req.body.product,req.body.currentAdmin);
        if (CreateOrders.status === true) {
            console.log("Order Details Inserted into DB with Status 0");
            console.log("<------------------------------->");
            res.status(200).json({ "message": "Order Placed successfully", "status":true ,"orderid":CreateOrders.orderId });
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

router.get('/GetOrderById/:id', async (req, res) => {

    try{
        const GetSingleOrderById = await GetOrderById(req.params.id);
        if(GetSingleOrderById != null && GetSingleOrderById != 'Not Found' && GetSingleOrderById != ''){
            console.log("<------------------------------->");
            res.status(200).json(GetSingleOrderById);
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



router.put('/ConfirmOrder', async (req, res) => {

    try {
        const ConfirmOrders = await ConfirmOrder(req.body.orderID, req.body.User);
        if (ConfirmOrders.status === true) {
            console.log("Order Details Confirmed with Status 1");
            console.log("<------------------------------->");
            res.status(200).json({ "message": "Order Confirmed successfully", "status":true});
        } else {
            console.log("Data Failed to Insert in DB");
            res.status(500).json({ "message": "Error Confirming Data","status":false });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);  
    }



});





module.exports = router;
   