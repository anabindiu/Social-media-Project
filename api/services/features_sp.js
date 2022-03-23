const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT profile_Email, Username, Share_Profiles 
    FROM features_sp LIMIT ${offset},${config.listPerPage}`
  )
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(features_sp){
  const result = await db.query(
    `INSERT INTO features_sp 
    (profile_Email, Username, Share_Profiles) 
    VALUES 
    ("${features_sp.profile_Email}", "${features_sp.Username}", "${features_sp.Share_Profiles}")`
  );

  let message = 'Error in creating features_sp';

  if (result.affectedRows) {
    message = 'features_sp created successfully';
  }

  return {message};
}

async function update(profile_Email, features_sp){
  const result = await db.query(
    `UPDATE features_sp 
    SET profile_Email=${features_sp.profile_Email}, Username=${features_sp.Username}, Share_Profiles=${features_sp.Share_Profiles}
    WHERE profile_Email=${profile_Email}` 
  );

  let message = 'Error in updating features_sp';

  if (result.affectedRows) {
    message = 'features_sp updated successfully';
  }

  return {message};
}

async function remove(profile_Email){
  const result = await db.query(
    `DELETE FROM features_sp WHERE profile_Email=${profile_Email}`
  );

  let message = 'Error in deleting features_sp';

  if (result.affectedRows) {
    message = 'features_sp deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  remove
}
