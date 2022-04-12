const db = require('./db');
const helper = require('../helper');
const config = require('../config');

function parseKey(key_type, key_value){
    switch(key_type){
        case "ID":
            return key_value;
        case "Profile_ID":
            return key_value;
        case "Calendar_Name":
            return `\"${key_value}\"`;
        default:
            return key_value;
    }
}

async function getAll(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT ID, Profile_ID, Calendar_Name
        FROM schedule LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};
    
    return {
        data,
        meta
    }
}

async function getOne(key_type, key_value){
    key_value = parseKey(key_type, key_value);
    const rows = await db.query(
        `SELECT ID, Profile_ID, Calendar_Name
        FROM schedule
        WHERE ${key_type}=${key_value}`
    );
    const data = helper.emptyOrRows(rows);
    
    return {
        data
    }
}

async function create(body){
    const result = await db.query(
        `INSERT INTO schedule 
        (Profile_ID, Calendar_Name) 
        VALUES 
        (${body.Profile_ID}, "${body.Calendar_Name}")`
    );
    
    let message = 'Error in creating schedule ';
    
    if (result.affectedRows) {
        message = 'schedule created successfully';
    }
    
    return {message};
}

async function update(key_type, key_value, body){
    key_value = parseKey(key_type, key_value);
    const result = await db.query(
        `UPDATE schedule 
        SET Profile_ID=${body.Profile_ID}, Calendar_Name="${body.Calendar_Name}"
        WHERE ${key_type}=${key_value}` 
    );
    
    let message = 'Error in updating schedule';
    
    if (result.affectedRows) {
        message = 'schedule updated successfully';
    }
    
    return {message};
}

async function remove(key_type, key_value){
    key_value = parseKey(key_type, key_value);
    const result = await db.query(
        `DELETE FROM schedule WHERE ${key_type}=${key_value}`
    );
    
    let message = 'Error in deleting schedule';
    
    if (result.affectedRows) {
        message = 'schedule deleted successfully';
    }
    
    return {message};
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
}