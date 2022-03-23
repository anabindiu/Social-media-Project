const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT profile_Email, Username, Header, Theme 
    FROM task_list LIMIT ${offset},${config.listPerPage}`
  )
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(task_list){
  const result = await db.query(
    `INSERT INTO task_list 
    (profile_Email, Username, Header, Theme) 
    VALUES 
    ("${task_list.profile_Email}", "${task_list.Username}", "${task_list.Header}", ${task_list.Theme})`
  );

  let message = 'Error in creating task_list ';

  if (result.affectedRows) {
    message = 'task_list created successfully';
  }

  return {message};
}

async function update(profile_Email, task_list){
  const result = await db.query(
    `UPDATE task_list 
    SET profile_Email=${task_list.profile_Email}, Username=${task_list.Username}, Header=${task_list.Header}, Theme=${task_list.Theme}
    WHERE profile_Email=${profile_Email}` 
  );

  let message = 'Error in updating task_list';

  if (result.affectedRows) {
    message = 'task_list updated successfully';
  }

  return {message};
}

async function remove(profile_Email){
  const result = await db.query(
    `DELETE FROM task_list WHERE profile_Email=${profile_Email}`
  );

  let message = 'Error in deleting task_list';

  if (result.affectedRows) {
    message = 'task_list deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  remove
}
