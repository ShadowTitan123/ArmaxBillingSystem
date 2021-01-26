"use strict";

//Import DB config 
const db = require('../DB/config.js');


/*
 * Gets All Users From Table
 * Returns a promise with Users Data if Found in Database.
 */

const GetAllUsers = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM `tbl_google_admin` ORDER BY id LIMIT 10", function (err, rows, fields) {
            if (err) {
                reject(err);
                throw err;
            }
            if (rows.length > 0) {
                console.log("Users Found!");
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
    GetAllUsers
}