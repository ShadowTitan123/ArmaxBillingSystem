"use strict";

const express = require('express');
const router = express.Router();
const { GetAllUsers } = require('../models/users.js');
const db = require('../DB/config.js');


router.get('/GetAllUsers', async (req, res) => {

    try{
        const GetAllUser = await GetAllUsers();
        if(GetAllUser != null && GetAllUser != 'Not Found' && GetAllUser != ''){
            console.log("<------------------------------->");
            res.status(200).json(GetAllUser);
        }else{
            res.status(200).json({"message":"Data Not Found"})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }


});




module.exports = router;
   