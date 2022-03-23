const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT profile_Email, Username, Month_Year, Total_Events, Total_Tasks, Total_Notes, Total_Reminders, Year
    FROM monthly_stats LIMIT ${offset},${config.listPerPage}`
  )
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(monthly_stats){
  const result = await db.query(
    `INSERT INTO monthly_stats 
    (profile_Email, Username, Month_Year, Total_Events, Total_Tasks, Total_Notes, Total_Reminders, Year) 
    VALUES 
    ("${monthly_stats.profile_Email}", "${monthly_stats.Username}", "${monthly_stats.Month_Year}", ${monthly_stats.Total_Events}, "${monthly_stats.Total_Tasks}", "${monthly_stats.Total_Notes}", ${monthly_stats.Total_Reminders}, ${monthly_stats.Year})`
  );

  let message = 'Error in creating monthly_stats ';

  if (result.affectedRows) {
    message = 'monthly_stats created successfully';
  }

  return {message};
}

async function update(profile_Email, monthly_stats){
  const result = await db.query(
    `UPDATE monthly_stats 
    SET profile_Email=${monthly_stats.profile_Email}, Username=${monthly_stats.Username}, Month_Year=${monthly_stats.Month_Year}, Total_Events=${monthly_stats.Total_Events}, Total_Tasks=${monthly_stats.Total_Tasks}, Total_Notes=${monthly_stats.Total_Notes}, Total_Reminders=${monthly_stats.Total_Reminders}, Year=${monthly_stats.Year}
    WHERE profile_Email=${profile_Email}` 
  );

  let message = 'Error in updating monthly_stats';

  if (result.affectedRows) {
    message = 'monthly_stats updated successfully';
  }

  return {message};
}

async function remove(profile_Email){
  const result = await db.query(
    `DELETE FROM monthly_stats WHERE profile_Email=${profile_Email}`
  );

  let message = 'Error in deleting monthly_stats';

  if (result.affectedRows) {
    message = 'monthly_stats deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  remove
}
