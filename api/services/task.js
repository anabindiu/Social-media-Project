const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT profile_Email, Username, Header, Task_ID, Deadline, Completion_Status, Description, Title, Location 
    FROM task LIMIT ${offset},${config.listPerPage}`
  )
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(task){
  const result = await db.query(
    `INSERT INTO task 
    (profile_Email, Username, Header, Task_ID, Deadline, Completion_Status, Description, Title, Location)
    VALUES 
    ("${task.profile_Email}", "${task.Username}", "${task.Header}", ${task.Task_ID}", "${task.Deadline}", "${task.Completion_Status}", ${task.Description}", "${task.Title}", "${task.Location}")`
  );

  let message = 'Error in creating task ';

  if (result.affectedRows) {
    message = 'task created successfully';
  }

  return {message};
}

async function update(profile_Email, task){
  const result = await db.query(
    `UPDATE task 
    SET profile_Email=${task.profile_Email}, Username=${task.Username}, Header=${task.Header}, Task_ID=${task.Task_ID}, Deadline=${task.Deadline}, Completion_Status=${task.Completion_Status}, Description=${task.Description}, Title=${task.Title}, Location=${task.Location}
    WHERE profile_Email=${profile_Email}` 
  );

  let message = 'Error in updating task';

  if (result.affectedRows) {
    message = 'task updated successfully';
  }

  return {message};
}

async function remove(profile_Email){
  const result = await db.query(
    `DELETE FROM task WHERE profile_Email=${profile_Email}`
  );

  let message = 'Error in deleting task';

  if (result.affectedRows) {
    message = 'task deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  remove
}
