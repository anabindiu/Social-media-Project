const mysql = require('mysql2/promise');
const config = require('../config');

async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);

  console.log(sql, params);
  await connection.query(sql, params, function(err,res){connection.end(); console.log(res); return res});
  console.log("Result");

}

module.exports = {
  query
}


