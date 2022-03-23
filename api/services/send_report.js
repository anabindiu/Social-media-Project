const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT User_eMail, Admin_eMail, Log, ReportID 
    FROM send_report LIMIT ${offset},${config.listPerPage}`
  )
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(send_report){
  const result = await db.query(
    `INSERT INTO send_report 
    (User_eMail, Admin_eMail, Log, ReportID) 
    VALUES 
    ("${send_report.User_eMail}", "${send_report.Admin_eMail}", "${send_report.Log}", ${send_report.ReportID})`
  );

  let message = 'Error in creating send_report ';

  if (result.affectedRows) {
    message = 'send_report created successfully';
  }

  return {message};
}

async function update(User_eMail, send_report){
  const result = await db.query(
    `UPDATE send_report 
    SET User_eMail=${send_report.User_eMail}, Admin_eMail=${send_report.Admin_eMail}, Log=${send_report.Log}, ReportID=${send_report.ReportID}
    WHERE User_eMail=${User_eMail}` 
  );

  let message = 'Error in updating send_report';

  if (result.affectedRows) {
    message = 'send_report updated successfully';
  }

  return {message};
}

async function remove(User_eMail){
  const result = await db.query(
    `DELETE FROM send_report WHERE User_eMail=${User_eMail}`
  );

  let message = 'Error in deleting send_report';

  if (result.affectedRows) {
    message = 'send_report deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  remove
}
