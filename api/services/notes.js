const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT profile_Email, Username, Note_ID, Date_Created, Title, Content 
    FROM notes LIMIT ${offset},${config.listPerPage}`
  )
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(notes){
  const result = await db.query(
    `INSERT INTO notes 
    (profile_Email, Username, Note_ID, Date_Created, Title, Content) 
    VALUES 
    ("${notes.profile_Email}", "${notes.Username}", "${notes.Note_ID}", ${notes.Date_Created}, "${notes.Title}", "${notes.Content}")`
  );

  let message = 'Error in creating notes ';

  if (result.affectedRows) {
    message = 'notes created successfully';
  }

  return {message};
}

async function update(profile_Email, notes){
  const result = await db.query(
    `UPDATE notes 
    SET profile_Email=${notes.profile_Email}, Username=${notes.Username}, Note_ID=${notes.Note_ID}, Date_Created=${notes.Date_Created}, Title=${notes.Title}, Content=${notes.Content}
    WHERE profile_Email=${profile_Email}` 
  );

  let message = 'Error in updating notes';

  if (result.affectedRows) {
    message = 'notes updated successfully';
  }

  return {message};
}

async function remove(profile_Email){
  const result = await db.query(
    `DELETE FROM notes WHERE profile_Email=${profile_Email}`
  );

  let message = 'Error in deleting notes';

  if (result.affectedRows) {
    message = 'notes deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  remove
}
