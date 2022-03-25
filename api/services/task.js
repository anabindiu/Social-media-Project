const db = require('./db');
const helper = require('../helper');
const config = require('../config');

function parseKey(key_type, key_value){
    switch(key_type){
        case "ID":
            return key_value;
        case "Tasks_ID":
            return key_value;
        default:
            return key_value;
    }
}

async function getAll(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT ID, Tasks_ID, Deadline, Completion_Status, Description, Title, Location
        FROM task LIMIT ${offset},${config.listPerPage}`
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
            `SELECT ID, Tasks_ID, Deadline, Completion_Status, Description, Title, Location
            FROM task
            WHERE ${key_type1}=${key_value1}`
        );
    }
    else{
        const rows = await db.query(
            `SELECT ID, Tasks_ID, Deadline, Completion_Status, Description, Title, Location
            FROM task
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
        `INSERT INTO task 
        (Tasks_ID, Deadline, Completion_Status, Description, Title, Location) 
        VALUES 
        (${body.Tasks_ID}, "${body.Deadline}", "${body.Completion_Status}", "${body.Description}", "${body.Title}", "${body.Location}")`
    );
    
    let message = 'Error in creating task ';
    
    if (result.affectedRows) {
        message = 'task created successfully';
    }
    
    return {message};
}

async function update(key_type1, key_type2, key_value1, key_value2, body){
    key_value1 = parseKey(key_type1, key_value1);
    key_value2 = parseKey(key_type2, key_value2);

    if(key_value2 == null){
        const result = await db.query(
            `UPDATE task 
            SET Notes_ID=${body.Tasks_ID}, Deadline="${body.Deadline}", Completion_Status="${body.Completion_Status}", Description="${body.Description}", Title="${body.Title}", Location="${body.Location}"
            WHERE ${key_type1}=${key_value1}`
        );
    }
    else{
        const result = await db.query(
            `UPDATE task 
            SET Notes_ID=${body.Tasks_ID}, Deadline="${body.Deadline}", Completion_Status="${body.Completion_Status}", Description="${body.Description}", Title="${body.Title}", Location="${body.Location}"
            WHERE ${key_type1}=${key_value1} AND ${key_type2}=${key_value2}` 
        );
    }
    

    let message = 'Error in updating task';
    
    if (result.affectedRows) {
        message = 'task updated successfully';
    }
    
    return {message};
}

async function remove(key_type1, key_type2, key_value1, key_value2){
    key_value1 = parseKey(key_type1, key_value1);
    key_value2 = parseKey(key_type2, key_value2);
    
    if(key_value2 == null){
        const result = await db.query(
            `DELETE FROM task WHERE ${key_type1}=${key_value1}`
        );
    }
    else{
        const result = await db.query(
            `DELETE FROM task WHERE ${key_type1}=${key_value1} AND ${key_type2}=${key_value2}`
        );
    }
    
    let message = 'Error in deleting task';
    
    if (result.affectedRows) {
        message = 'task deleted successfully';
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