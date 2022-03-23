const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT Email, Username, Setting_id, Date_Format, Time_Format, TimeZone, Language, Theme, Country, Notification 
    FROM settings LIMIT ${offset},${config.listPerPage}`
  )
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(settings){
  const result = await db.query(
    `INSERT INTO settings 
    (Email, Username, Setting_id, Date_Format, Time_Format, TimeZone, Language, Theme, Country, Notification) 
    VALUES 
    ("${settings.Email}", "${settings.Username}", "${settings.Setting_id}", ${settings.Date_Format}, "${settings.Time_Format}", "${settings.TimeZone}", ${settings.Language}, "${settings.Theme}", ${settings.Country}, ${settings.Notification})`
  );

  let message = 'Error in creating settings';

  if (result.affectedRows) {
    message = 'settings created successfully';
  }

  return {message};
}

async function update(Email, settings){
  const result = await db.query(
    `UPDATE settings 
    SET Email=${settings.Email}, Username=${settings.Username}, Setting_id=${settings.Setting_id}, Date_Format=${settings.Date_Format}, Time_Format=${settings.Time_Format}, TimeZone=${settings.TimeZone}, Language=${settings.Language}, Theme=${settings.Theme}, Country=${settings.Country}, Notification=${settings.Notification}
    WHERE Email=${Email}` 
  );

  let message = 'Error in updating settings';

  if (result.affectedRows) {
    message = 'settings updated successfully';
  }

  return {message};
}

async function remove(Email){
  const result = await db.query(
    `DELETE FROM settings WHERE Email=${Email}`
  );

  let message = 'Error in deleting settings';

  if (result.affectedRows) {
    message = 'settings deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  remove
}
