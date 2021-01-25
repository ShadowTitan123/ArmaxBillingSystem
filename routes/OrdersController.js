"use strict";

const express = require('express');
const router = express.Router();
const { CreateOrder } = require('../models/orders.js');
const db = require('../DB/config.js');


router.post('/PlaceOrder', async (req, res) => {

    try {
        const CreateOrders = await CreateOrder(req.body.firstName, req.body.LastName, req.body.Email, req.body.Address, req.body.Address2, req.body.Country, req.body.State, req.body.Zip, req.body.CardName, req.body.CreditCard, req.body.Expiration, req.body.CVV,req.body.product);
        if (CreateOrders === true) {
            console.log("Order Details Inserted into DB");
            console.log("<------------------------------->");
            res.status(200).json({ "message": "Order Placed successfully", "status":true });
        } else {
            console.log("Data Failed to Insert in DB");
            res.status(500).json({ "message": "Error Inserting Data" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }



});




module.exports = router;
   