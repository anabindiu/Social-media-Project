const db = require('./db');
const helper = require('../helper');
const config = require('../config');

function parseKey(key_type, key_value){
    switch(key_type){
        case "ID":
            return key_value;
        case "Profile_ID":
            return key_value;
        default:
            return key_value;
    }
}

async function getAll(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT ID, Profile_ID, Date_Format, Time_Format, TimeZone, Language, Theme, Country, Notification
        FROM settings LIMIT ${offset},${config.listPerPage}`
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
        `SELECT ID, Profile_ID, Date_Format, Time_Format, TimeZone, Language, Theme, Country, Notification
        FROM settings
        WHERE ${key_type}=${key_value}`
    );
    const data = helper.emptyOrRows(rows);
    
    return {
        data
    }
}

async function create(body){
    const result = await db.query(
        `INSERT INTO settings 
        (Profile_ID, Date_Format, Time_Format, TimeZone, Language, Theme, Country, Notification) 
        VALUES 
        (${body.Profile_ID}, "${body.Date_Format}", "${body.Time_Format}", "${body.TimeZone}", "${body.Language}", "${body.Theme}", "${body.Country}", "${body.Notification}")`
    );
    
    let message = 'Error in creating settings ';
    
    if (result.affectedRows) {
        message = 'settings created successfully';
    }
    
    return {message};
}

async function update(key_type, key_value, body){
    
    key_value = parseKey(key_type, key_value);
    const result = await db.query(
        `UPDATE settings 
        SET Profile_ID=${body.Profile_ID}, Date_Format="${body.Date_Format}", Time_Format="${body.Time_Format}", TimeZone="${body.TimeZone}", Language="${body.Language}", Theme="${body.Theme}", Country="${body.Country}", Notification="${body.Notification}"
        WHERE ${key_type}=${key_value}` 
    );
    
    let message = 'Error in updating settings';
    
    if (result.affectedRows) {
        message = 'settings updated successfully';
    }
    
    return {message};
}

async function remove(key_type, key_value){
    key_value = parseKey(key_type, key_value);
    const result = await db.query(
        `DELETE FROM settings WHERE ${key_type}=${key_value}`
    );
    
    let message = 'Error in deleting settings';
    
    if (result.affectedRows) {
        message = 'settings deleted successfully';
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