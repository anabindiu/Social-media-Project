const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT Email, Username
    FROM has_friend LIMIT ${offset},${config.listPerPage}`
  )
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(has_friend){
  const result = await db.query(
    `INSERT INTO has_friend 
    (Email, Username) 
    VALUES 
    ("${has_friend.Email}", "${has_friend.Username}")`
  );

  let message = 'Error in creating has_friend';

  if (result.affectedRows) {
    message = 'has_friend created successfully';
  }

  return {message};
}

async function update(Email, has_friend){
  const result = await db.query(
    `UPDATE has_friend 
    SET Email=${has_friend.Email}, Username=${has_friend.Username}
    WHERE Email=${Email}` 
  );

  let message = 'Error in updating has_friend';

  if (result.affectedRows) {
    message = 'has_friend updated successfully';
  }

  return {message};
}

async function remove(Email){
  const result = await db.query(
    `DELETE FROM has_friend WHERE Email=${Email}`
  );

  let message = 'Error in deleting has_friend';

  if (result.affectedRows) {
    message = 'has_friend deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  remove
}
