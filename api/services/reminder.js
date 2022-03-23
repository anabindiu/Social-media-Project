const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT Reminder_ID, Location, Description, Title, Calendar_Name
    FROM reminder LIMIT ${offset},${config.listPerPage}`
  )
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(reminder){
  const result = await db.query(
    `INSERT INTO reminder 
    (Reminder_ID, Location, Description, Title, Calendar_Name) 
    VALUES 
    ("${reminder.Reminder_ID}", "${reminder.Location}", "${reminder.Description}", ${reminder.Title}, "${reminder.Calendar_Name}")`
  );

  let message = 'Error in creating reminder';

  if (result.affectedRows) {
    message = 'reminder created successfully';
  }

  return {message};
}

async function update(Reminder_ID, reminder){
  const result = await db.query(
    `UPDATE reminder 
    SET Reminder_ID=${reminder.Reminder_ID}, Location=${reminder.Location}, Description=${reminder.Description}, Title=${reminder.Title}, Calendar_Name=${reminder.Calendar_Name}
    WHERE Reminder_ID=${Reminder_ID}` 
  );

  let message = 'Error in updating reminder';

  if (result.affectedRows) {
    message = 'reminder updated successfully';
  }

  return {message};
}

async function remove(Reminder_ID){
  const result = await db.query(
    `DELETE FROM reminder WHERE Reminder_ID=${Reminder_ID}`
  );

  let message = 'Error in deleting reminder';

  if (result.affectedRows) {
    message = 'reminder deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  remove
}
