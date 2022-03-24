const db = require('./db');
const helper = require('../helper');
const config = require('../config');

function parseKey(key_type, key_value){
    switch(key_type){
        case "Profile_ID":
            return key_value;
        case "Profile_Email":
            return `\"${key_value}\"`;
        case "Profile_Username":
            return `\"${key_value}\"`;
        default:
            return key_value;
    }
}

async function getAll(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT Profile_ID, Profile_Email, Profile_Username, Schedule_ID, Notes_ID, Tasks_ID, Setting_ID
        FROM features LIMIT ${offset},${config.listPerPage}`
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
        `SELECT Profile_ID, Profile_Email, Profile_Username, Schedule_ID, Notes_ID, Tasks_ID, Setting_ID
        FROM features
        WHERE ${key_type}=${key_value}`
    );
    const data = helper.emptyOrRows(rows);
    
    return {
        data
    }
}

async function create(body){
    const result = await db.query(
        `INSERT INTO features 
        (Profile_ID, Profile_Email, Profile_Username, Schedule_ID, Notes_ID, Tasks_ID, Setting_ID) 
        VALUES 
        (${body.Profile_ID}, "${body.Profile_Email}", "${body.Profile_Username}", ${body.Schedule_ID}, ${body.Notes_ID}, ${body.Tasks_ID}, ${body.Setting_ID})`
    );
    
    let message = 'Error in creating features ';
    
    if (result.affectedRows) {
        message = 'features created successfully';
    }
    
    return {message};
}

async function update(key_type, key_value, body){
    key_value = parseKey(key_type, key_value);
    const result = await db.query(
        `UPDATE features 
        SET Profile_ID=${body.Profile_ID}, Profile_Email="${body.Profile_Email}", Profile_Username="${body.Profile_Username}", Schedule_ID=${body.Schedule_ID}, Notes_ID=${body.Notes_ID}, Tasks_ID=${body.Tasks_ID}, Setting_ID=${body.Setting_ID},
        WHERE ${key_type}=${key_value}` 
    );
    
    let message = 'Error in updating features';
    
    if (result.affectedRows) {
        message = 'features updated successfully';
    }
    
    return {message};
}

async function remove(key_type, key_value){
    key_value = parseKey(key_type, key_value);
    const result = await db.query(
        `DELETE FROM features WHERE ${key_type}=${key_value}`
    );
    
    let message = 'Error in deleting features';
    
    if (result.affectedRows) {
        message = 'features deleted successfully';
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