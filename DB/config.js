const mysql = require('mysql')


// const connection = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'armax'
// })


//For Heroku Server
const connection = mysql.createPool({
  host: 'us-cdbr-east-03.cleardb.com',
  user: 'b5e1d321dc7bd4',
  password: 'c330d770',
  database: 'heroku_eace1ac7b0b4dcb'
})


module.exports = connection;