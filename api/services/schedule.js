const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT profile_Email, Username, Calendar_Name, Theme 
    FROM schedule LIMIT ${offset},${config.listPerPage}`
  )
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(schedule){
  const result = await db.query(
    `INSERT INTO schedule 
    (profile_Email, Username, Calendar_Name, Theme) 
    VALUES 
    ("${schedule.profile_Email}", "${schedule.Username}", "${schedule.Calendar_Name}", ${schedule.Theme})`
  );

  let message = 'Error in creating schedule';

  if (result.affectedRows) {
    message = 'schedule created successfully';
  }

  return {message};
}

async function update(profile_Email, schedule){
  const result = await db.query(
    `UPDATE schedule 
    SET profile_Email=${schedule.profile_Email}, Username=${schedule.Username}, Calendar_Name=${schedule.Calendar_Name}, Theme=${schedule.Theme}
    WHERE profile_Email=${profile_Email}` 
  );

  let message = 'Error in updating schedule';

  if (result.affectedRows) {
    message = 'schedule updated successfully';
  }

  return {message};
}

async function remove(profile_Email){
  const result = await db.query(
    `DELETE FROM schedule WHERE profile_Email=${profile_Email}`
  );

  let message = 'Error in deleting schedule';

  if (result.affectedRows) {
    message = 'schedule deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  remove
}
