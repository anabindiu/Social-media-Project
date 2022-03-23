const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT profile_Email, Username, Title 
    FROM usage_statistics LIMIT ${offset},${config.listPerPage}`
  )
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(usage_statistics){
  const result = await db.query(
    `INSERT INTO usage_statistics 
    (profile_Email, Username, Title) 
    VALUES 
    ("${usage_statistics.profile_Email}", "${usage_statistics.Username}", "${usage_statistics.Title}")`
  );

  let message = 'Error in creating usage_statistics ';

  if (result.affectedRows) {
    message = 'usage_statistics created successfully';
  }

  return {message};
}

async function update(profile_Email, usage_statistics){
  const result = await db.query(
    `UPDATE usage_statistics 
    SET profile_Email=${usage_statistics.profile_Email}, Username=${usage_statistics.Username}, Title=${usage_statistics.Title}
    WHERE profile_Email=${profile_Email}` 
  );

  let message = 'Error in updating usage_statistics';

  if (result.affectedRows) {
    message = 'usage_statistics updated successfully';
  }

  return {message};
}

async function remove(profile_Email){
  const result = await db.query(
    `DELETE FROM usage_statistics WHERE profile_Email=${profile_Email}`
  );

  let message = 'Error in deleting usage_statistics';

  if (result.affectedRows) {
    message = 'usage_statistics deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  remove
}
