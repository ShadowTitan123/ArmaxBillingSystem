"use strict";

//Import DB config 
const db = require('../DB/config.js');


/*
 * Gets All Products From Table
 * Returns a promise with Products Data if Found in Database.
 */

const GetAllProducts = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM `tbl_products` ORDER BY id LIMIT 10", function (err, rows, fields) {
            if (err) {
                reject(err);
                throw err;
            }
            if (rows.length > 0) {
                console.log("Products Found!");
                resolve(rows);
            } else {
                const error = "Not Found";
                console.log("Data Not Found");
                resolve(error);
            }
        });

    });

}

const GetSingleProduct = (id) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM `tbl_products` WHERE id = ? LIMIT 1",[id] ,function (err, rows, fields) {
            if (err) {
                reject(err);
                throw err;
            }
            if (rows.length > 0) {
                console.log("Product Found!");
                resolve(rows);
            } else {
                const error = "Not Found";
                console.log("Data Not Found");
                resolve(error);
            }
        });

    });

}

//Exports
module.exports = {
    GetAllProducts,
    GetSingleProduct
}