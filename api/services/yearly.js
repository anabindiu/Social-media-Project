const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT profile_Email, Username, Year
    FROM yearly LIMIT ${offset},${config.listPerPage}`
  )
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(yearly){
  const result = await db.query(
    `INSERT INTO yearly 
    (profile_Email, Username, Year) 
    VALUES 
    ("${yearly.profile_Email}", "${yearly.Username}", "${yearly.Year}")`
  );

  let message = 'Error in creating yearly ';

  if (result.affectedRows) {
    message = 'yearly created successfully';
  }

  return {message};
}

async function update(profile_Email, yearly){
  const result = await db.query(
    `UPDATE yearly 
    SET profile_Email=${yearly.profile_Email}, Username=${yearly.Username}, Year=${yearly.Year}
    WHERE profile_Email=${profile_Email}` 
  );

  let message = 'Error in updating yearly';

  if (result.affectedRows) {
    message = 'yearly updated successfully';
  }

  return {message};
}

async function remove(profile_Email){
  const result = await db.query(
    `DELETE FROM yearly WHERE profile_Email=${profile_Email}`
  );

  let message = 'Error in deleting yearly';

  if (result.affectedRows) {
    message = 'yearly deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  remove
}
