"use strict";

//Import DB config 
const db = require('../DB/config.js');

/*
 * Create a New Cache Data and Inserts into Table
 * Returns a promise with status true/false after insertion.
 */

const CreateOrder = (firstName, LastName, Email, Address, Address2, Country, State, Zip, CardName, CreditCard, Expiration, CVV,id) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO `tbl_orders` (`product_id`, `firstName`, `LastName`, `Email`, `Address`, `Address2`, `Country`, `State`, `Zip`, `CardName`, `CreditCard`, `Expiration`, `CVV`, `session_user`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [id,firstName,LastName, Email, Address, Address2, Country, State, Zip, CardName, CreditCard, Expiration, CVV, 2], function (err, rows, fields) {
                if (err) {
                    reject(err);
                    throw err;
                }
                else if(rows.affectedRows > 0) {
                    console.log("Order Placed Successfully");
                    var status = true;
                    resolve(status);
                } else {
                    console.log("Error Inserting Record");
                    var status = false;
                    resolve(status);
                }
            });
    })

}


module.exports = {
    CreateOrder
}