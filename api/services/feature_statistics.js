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
        `SELECT ID, Profile_ID, Statistics_type, Title
        FROM feature_statistics LIMIT ${offset},${config.listPerPage}`
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
        `ID, Profile_ID, Statistics_type, Title
        FROM feature_statistics
        WHERE ${key_type}=${key_value}`
    );
    const data = helper.emptyOrRows(rows);
    
    return {
        data
    }
}

async function create(body){
    const result = await db.query(
        `INSERT INTO feature_statistics 
        (Profile_ID, Statistics_type, Title) 
        VALUES 
        (${body.Profile_ID}, "${body.Statistics_type}", "${body.Title}")`
    );
    
    let message = 'Error in creating feature_statistics ';
    
    if (result.affectedRows) {
        message = 'feature_statistics created successfully';
    }
    
    return {message};
}

async function update(key_type, key_value, body){
    key_value = parseKey(key_type, key_value);
    const result = await db.query(
        `UPDATE feature_statistics 
        SET Profile_ID=${body.Profile_ID}, Statistics_type="${body.Statistics_type}", Title="${body.Title}"
        WHERE ${key_type}=${key_value}` 
    );
    
    let message = 'Error in updating feature_statistics';
    
    if (result.affectedRows) {
        message = 'feature_statistics updated successfully';
    }
    
    return {message};
}

async function remove(key_type, key_value){
    key_value = parseKey(key_type, key_value);
    const result = await db.query(
        `DELETE FROM feature_statistics WHERE ${key_type}=${key_value}`
    );
    
    let message = 'Error in deleting feature_statistics';
    
    if (result.affectedRows) {
        message = 'feature_statistics deleted successfully';
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