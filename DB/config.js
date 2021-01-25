const mysql = require('mysql')


const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'armax'
})


//For Heroku Server
// const connection = mysql.createPool({
//   host: 'us-cdbr-east-03.cleardb.com',
//   user: 'b83390b77425af',
//   password: 'abaca946',
//   database: 'heroku_52228eb2a81f0d2'
// })


module.exports = connection;