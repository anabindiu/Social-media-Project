const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT profile_Email, Username, Setting_id, User_eMail 
    FROM features LIMIT ${offset},${config.listPerPage}`
  )
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(features){
  const result = await db.query(
    `INSERT INTO features 
    (profile_Email, Username, Setting_id, User_eMail) 
    VALUES 
    ("${features.profile_Email}", "${features.Username}", "${features.Setting_id}", ${features.User_eMail})`
  );

  let message = 'Error in creating features';

  if (result.affectedRows) {
    message = 'features created successfully';
  }

  return {message};
}

async function update(profile_Email, features){
  const result = await db.query(
    `UPDATE features 
    SET profile_Email=${features.profile_Email}, Username=${features.Username}, Setting_id=${features.Setting_id}, User_eMail=${features.User_eMail}
    WHERE profile_Email=${profile_Email}` 
  );

  let message = 'Error in updating features';

  if (result.affectedRows) {
    message = 'features updated successfully';
  }

  return {message};
}

async function remove(profile_Email){
  const result = await db.query(
    `DELETE FROM features WHERE profile_Email=${profile_Email}`
  );

  let message = 'Error in deleting features';

  if (result.affectedRows) {
    message = 'features deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  remove
}
