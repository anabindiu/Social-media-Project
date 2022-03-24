const db = require('./db');
const helper = require('../helper');
const config = require('../config');

function parseKey(key_type, key_value){
    switch(key_type){
        case "ID":
            return key_value;
        case "Email":
            return `\"${key_value}\"`;
        default:
            return key_value;
    }
}

async function getAll(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT ID, Email
        FROM administrator LIMIT ${offset},${config.listPerPage}`
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
        `SELECT ID, Email
        FROM administrator
        WHERE ${key_type}=${key_value}`
    );
    const data = helper.emptyOrRows(rows);
    
    return {
        data
    }
}

async function create(body){
    const result = await db.query(
        `INSERT INTO administrator 
        (Email) 
        VALUES 
        ("${body.Email}")`
    );
    
    let message = 'Error in creating administrator ';
    
    if (result.affectedRows) {
        message = 'administrator created successfully';
    }
    
    return {message};
}

async function update(key_type, key_value, body){
    key_value = parseKey(key_type, key_value);
    const result = await db.query(
        `UPDATE administrator 
        SET Email="${body.Email}"
        WHERE ${key_type}=${key_value}` 
    );
    
    let message = 'Error in updating administrator';
    
    if (result.affectedRows) {
        message = 'administrator updated successfully';
    }
    
    return {message};
}

async function remove(key_type, key_value){
    key_value = parseKey(key_type, key_value);
    const result = await db.query(
        `DELETE FROM administrator WHERE ${key_type}=${key_value}`
    );
    
    let message = 'Error in deleting administrator';
    
    if (result.affectedRows) {
        message = 'administrator deleted successfully';
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