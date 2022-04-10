const db = require('./db');
const helper = require('../helper');
const config = require('../config');

function parseKey(key_type, key_value){
    switch(key_type){
        case "ID":
            return key_value;
        case "Notes_ID":
            return key_value;
        default:
            return key_value;
    }
}

async function getAll(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT ID, Notes_ID, Date_Created, Title, Content
        FROM note LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};
    
    return {
        data,
        meta
    }
}

async function getOne(key_type1, key_type2, key_value1, key_value2){
    key_value1 = parseKey(key_type1, key_value1);
    key_value2 = parseKey(key_type2, key_value2);
    if(key_value2 == null){
        const rows = await db.query(
            `SELECT ID, Notes_ID, Date_Created, Title, Content
            FROM note
            WHERE ${key_type1}=${key_value1}`
        );
    }
    else{
        const rows = await db.query(
            `SELECT ID, Notes_ID, Date_Created, Title, Content
            FROM note
            WHERE ${key_type1}=${key_value1} AND ${key_type2}=${key_value2}`
        );
    }
    
    const data = helper.emptyOrRows(rows);
    
    return {
        data
    }
}

async function create(body){
    const result = await db.query(
        `INSERT INTO note 
        (Notes_ID, Date_Created, Title, Content) 
        VALUES 
        (${body.Notes_ID}, "${body.Date_Created}", "${body.Title}", "${body.Content}")`
    );
    
    let message = 'Error in creating note ';
    
    if (result.affectedRows) {
        message = 'note created successfully';
    }
    
    return {message};
}

async function update(key_type1, key_type2, key_value1, key_value2, body){
    key_value1 = parseKey(key_type1, key_value1);
    key_value2 = parseKey(key_type2, key_value2);

    if(key_value2 == null){
        const result = await db.query(
            `UPDATE note 
            SET Notes_ID=${body.Notes_ID}, Date_Created="${body.Date_Created}", Title="${body.Title}", Content="${body.Content}"
            WHERE ${key_type1}=${key_value1}`
        );
    }
    else{
        const result = await db.query(
            `UPDATE note 
            SET Notes_ID=${body.Notes_ID}, Date_Created="${body.Date_Created}", Title="${body.Title}", Content="${body.Content}"
            WHERE ${key_type1}=${key_value1} AND ${key_type2}=${key_value2}` 
        );
    }
    

    let message = 'Error in updating note';
    
    if (result.affectedRows) {
        message = 'note updated successfully';
    }
    
    return {message};
}

async function remove(key_type1, key_type2, key_value1, key_value2){
    key_value1 = parseKey(key_type1, key_value1);
    key_value2 = parseKey(key_type2, key_value2);
    
    if(key_value2 == null){
        const result = await db.query(
            `DELETE FROM note WHERE ${key_type1}=${key_value1}`
        );
    }
    else{
        const result = await db.query(
            `DELETE FROM note WHERE ${key_type1}=${key_value1} AND ${key_type2}=${key_value2}`
        );
    }
    
    let message = 'Error in deleting note';
    
    if (result.affectedRows) {
        message = 'note deleted successfully';
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