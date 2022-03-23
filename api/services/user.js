const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT User_eMail 
    FROM user LIMIT ${offset},${config.listPerPage}`
  )
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(user){
  const result = await db.query(
    `INSERT INTO user 
    (User_eMail)
    VALUES 
    ("${user.User_eMail}")`
  );

  let message = 'Error in creating user';

  if (result.affectedRows) {
    message = 'user created successfully';
  }

  return {message};
}

async function update(User_eMail, user){
  const result = await db.query(
    `UPDATE user 
    SET User_eMail=${user.User_eMail}
    WHERE User_eMail=${User_eMail}` 
  );

  let message = 'Error in updating user';

  if (result.affectedRows) {
    message = 'user updated successfully';
  }

  return {message};
}

async function remove(User_eMail){
  const result = await db.query(
    `DELETE FROM user WHERE User_eMail=${User_eMail}`
  );

  let message = 'Error in deleting user';

  if (result.affectedRows) {
    message = 'user deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  remove
}
