const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT Admin_Email, profile_Email, Username
    FROM modify LIMIT ${offset},${config.listPerPage}`
  )
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(modify){
  const result = await db.query(
    `INSERT INTO modify 
    (Admin_Email, profile_Email, Username) 
    VALUES 
    ("${modify.Admin_Email}", "${modify.profile_Email}", "${modify.Username}")`
  );

  let message = 'Error in creating modify';

  if (result.affectedRows) {
    message = 'modify created successfully';
  }

  return {message};
}

async function update(Admin_Email, modify){
  const result = await db.query(
    `UPDATE modify 
    SET Admin_Email=${modify.Admin_Email}, profile_Email=${modify.profile_Email}, "Username"=${modify.Username}
    WHERE Admin_Email=${Admin_Email}` 
  );

  let message = 'Error in updating modify';

  if (result.affectedRows) {
    message = 'modify updated successfully';
  }

  return {message};
}

async function remove(Admin_Email){
  const result = await db.query(
    `DELETE FROM modify WHERE Admin_Email=${Admin_Email}`
  );

  let message = 'Error in deleting modify';

  if (result.affectedRows) {
    message = 'modify deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  remove
}
