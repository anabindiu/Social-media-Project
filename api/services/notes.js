const db = require('./db');
const helper = require('../helper');
const config = require('../config');

function parseKey(key_type, key_value){
    switch(key_type){
        case "ID":
            return key_value;
        default:
            return key_value;
    }
}

async function getAll(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT ID
        FROM notes LIMIT ${offset},${config.listPerPage}`
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
        `SELECT ID
        FROM notes
        WHERE ${key_type}=${key_value}`
    );
    const data = helper.emptyOrRows(rows);
    
    return {
        data
    }
}

async function create(body){
    const result = await db.query(
        `INSERT INTO notes 
        () 
        VALUES 
        ()`
    );
    
    let message = 'Error in creating notes ';
    
    if (result.affectedRows) {
        message = 'notes created successfully';
    }
    
    return {message};
}

async function update(key_type, key_value, body){
    key_value = parseKey(key_type, key_value);
    const result = await db.query(
        `UPDATE notes 
        SET ID=${body.ID}
        WHERE ${key_type}=${key_value}` 
    );
    
    let message = 'Error in updating notes';
    
    if (result.affectedRows) {
        message = 'notes updated successfully';
    }
    
    return {message};
}

async function remove(key_type, key_value){
    key_value = parseKey(key_type, key_value);
    const result = await db.query(
        `DELETE FROM notes WHERE ${key_type}=${key_value}`
    );
    
    let message = 'Error in deleting notes';
    
    if (result.affectedRows) {
        message = 'notes deleted successfully';
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