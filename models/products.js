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


const AddProduct = (ptitle, type, price) => {
    return new Promise((resolve, reject) => {
        const imgpath = 'http://localhost:3000/products/1.jpg';
        db.query("INSERT INTO `tbl_products` (`product_name`, `product_type`, `product_price`, `product_image`) VALUES ( ?, ?, ?, ?);",
            [ptitle,type,price,imgpath], function (err, rows, fields) {
                if (err) {
                    reject(err);
                    throw err;
                }
                else if(rows.affectedRows > 0) {
                    console.log("Product Added Successfully");
                    var status = {status:true};
                    resolve(status);
                } else {
                    console.log("Error Inserting Record");
                    var status = {status:false};
                    resolve(status);
                }
            });
    })

}

const UpdateProduct = (name,type,price,id) => {
    return new Promise((resolve, reject) => {
        db.query("Update tbl_products SET product_name = ? , product_type = ? , product_price = ? WHERE id = ?",
            [name,type,price,id], function (err, rows, fields) {
                if (err) {
                    reject(err);
                    throw err;
                }
                else if(rows.affectedRows > 0) {
                    console.log("Product Updated Successfully");
                    var status = {status:true};
                    resolve(status);
                } else {
                    console.log("Error Inserting Record");
                    var status = {status:false};
                    resolve(status);
                }
            });
    })
}

const DeleteProduct = (id) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM `tbl_products` WHERE `tbl_products`.`id` = ?",
            [id], function (err, rows, fields) {
                if (err) {
                    reject(err);
                    throw err;
                }
                else if(rows.affectedRows > 0) {
                    console.log("Product Deleted Successfully");
                    var status = {status:true};
                    resolve(status);
                } else {
                    console.log("Error Inserting Record");
                    var status = {status:false};
                    resolve(status);
                }
            });
    })

}



//Exports
module.exports = {
    GetAllProducts,
    GetSingleProduct,
    AddProduct,
    UpdateProduct,
    DeleteProduct
}