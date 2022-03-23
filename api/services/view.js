const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT Admin_Email, profile_Email, Username 
    FROM view LIMIT ${offset},${config.listPerPage}`
  )
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(view){
  const result = await db.query(
    `INSERT INTO view 
    (Admin_Email, profile_Email, Username) 
    VALUES 
    ("${view.Admin_Email}", "${view.profile_Email}", "${view.Username}")`
  );

  let message = 'Error in creating view ';

  if (result.affectedRows) {
    message = 'view created successfully';
  }

  return {message};
}

async function update(Admin_Email, view){
  const result = await db.query(
    `UPDATE view 
    SET Admin_Email=${view.Admin_Email}, profile_Email=${view.profile_Email}, Username=${view.Username}
    WHERE Admin_Email=${Admin_Email}` 
  );

  let message = 'Error in updating view';

  if (result.affectedRows) {
    message = 'view updated successfully';
  }

  return {message};
}

async function remove(Admin_Email){
  const result = await db.query(
    `DELETE FROM view WHERE Admin_Email=${Admin_Email}`
  );

  let message = 'Error in deleting view';

  if (result.affectedRows) {
    message = 'view deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  remove
}
