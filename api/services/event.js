const db = require('./db');
const helper = require('../helper');
const config = require('../config');

function parseKey(key_type, key_value){
    switch(key_type){
        case "ID":
            return key_value;
        case "Schedule_ID":
            return key_value;
        default:
            return key_value;
    }
}

async function getAll(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT ID, Schedule_ID, Location, Description, Title, Start_Date, End_Date
        FROM event LIMIT ${offset},${config.listPerPage}`
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
        `SELECT ID, Schedule_ID, Location, Description, Title, Start_Date, End_Date
        FROM event
        WHERE ${key_type}=${key_value}`
    );
    const data = helper.emptyOrRows(rows);
    
    return {
        data
    }
}

async function create(body){
    const result = await db.query(
        `INSERT INTO event 
        (Schedule_ID, Location, Description, Title, Start_Date, End_Date) 
        VALUES 
        (${body.Schedule_ID}, "${body.Location}", "${body.Description}", "${body.Title}", "${body.Start_Date}", "${body.End_Date}")`
    );
    
    let message = 'Error in creating event ';
    
    if (result.affectedRows) {
        message = 'event created successfully';
    }
    
    return {message};
}

async function update(key_type, key_value, body){
    key_value = parseKey(key_type, key_value);
    const result = await db.query(
        `UPDATE event 
        SET Schedule_ID=${body.Schedule_ID}, Location="${body.Location}", Description="${body.Description}", Title="${body.Title}", Start_Date="${body.Start_Date}", End_Date="${body.End_Date}"
        WHERE ${key_type}=${key_value}` 
    );
    
    let message = 'Error in updating event';
    
    if (result.affectedRows) {
        message = 'event updated successfully';
    }
    
    return {message};
}

async function remove(key_type, key_value){
    key_value = parseKey(key_type, key_value);
    const result = await db.query(
        `DELETE FROM event WHERE ${key_type}=${key_value}`
    );
    
    let message = 'Error in deleting event';
    
    if (result.affectedRows) {
        message = 'event deleted successfully';
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