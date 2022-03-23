const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT Event_ID, Location, Description, Title, Start_Date, End_Date, Calendar_Name
    FROM event LIMIT ${offset},${config.listPerPage}`
  )
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(event){
  const result = await db.query(
    `INSERT INTO event 
    (Event_ID, Location, Description, Title, Start_Date, End_Date, Calendar_Name) 
    VALUES 
    ("${event.Event_ID}", "${event.Location}", "${event.Description}", ${event.Title}, "${event.Start_Date}", "${event.End_Date}", ${event.Calendar_Name})`
  );

  let message = 'Error in creating event ';

  if (result.affectedRows) {
    message = 'event created successfully';
  }

  return {message};
}

async function update(Event_ID, event){
  const result = await db.query(
    `UPDATE event 
    SET Event_ID=${event.Event_ID}, Location=${event.Location}, Description=${event.Description}, Title=${event.Title}, Start_Date=${event.Start_Date}, End_Date=${event.End_Date}, Calendar_Name=${event.Calendar_Name}
    WHERE Event_ID=${Event_ID}` 
  );

  let message = 'Error in updating event';

  if (result.affectedRows) {
    message = 'event updated successfully';
  }

  return {message};
}

async function remove(Event_ID){
  const result = await db.query(
    `DELETE FROM event WHERE Event_ID=${Event_ID}`
  );

  let message = 'Error in deleting event';

  if (result.affectedRows) {
    message = 'event deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  remove
}
