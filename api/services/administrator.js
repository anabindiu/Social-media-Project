const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT Admin_Email 
    FROM administrator LIMIT ${offset},${config.listPerPage}`
  )
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(administrator){
  const result = await db.query(
    `INSERT INTO administrator 
    (Admin_Email) 
    VALUES 
    ("${administrator.Admin_Email}")`
  );

  let message = 'Error in creating administrator ';

  if (result.affectedRows) {
    message = 'administrator created successfully';
  }

  return {message};
}

async function update(Admin_Email, administrator){
  const result = await db.query(
    `UPDATE administrator 
    SET Admin_Email=${administrator.Admin_Email}
    WHERE Admin_Email=${Admin_Email}` 
  );

  let message = 'Error in updating administrator';

  if (result.affectedRows) {
    message = 'administrator updated successfully';
  }

  return {message};
}

async function remove(Admin_Email){
  const result = await db.query(
    `DELETE FROM administrator WHERE Admin_Email=${Admin_Email}`
  );

  let message = 'Error in deleting administrator';

  if (result.affectedRows) {
    message = 'administrator deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  remove
}
