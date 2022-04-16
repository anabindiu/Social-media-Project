const db = require('./db');
const mysql = require('mysql');

async function getAll(){
    const data = await db.query(
        `SELECT ID, Profile_ID, Header
        FROM tasks`
    );
    return(data);
}

async function getOne(key_type, key_value){
    const data = await db.query(
        `SELECT ID, Profile_ID, Header
        FROM tasks
        WHERE ${key_type}=`+mysql.escape(key_value)+``
    );
    return(data);
}

async function create(body){
    const result = await db.query(
        `INSERT INTO tasks 
        (Profile_ID, Header) 
        VALUES 
        (`+mysql.escape(body.Profile_ID)+`, `+mysql.escape(body.Header)+`)`
    );
    
    return result;
}

async function update(key_type, key_value, body){
    const result = await db.query(
        `UPDATE tasks 
        SET Profile_ID=`+mysql.escape(body.Profile_ID)+`, Header=`+mysql.escape(body.Header)+`
        WHERE ${key_type}=`+mysql.escape(key_value)+`` 
    );
    
    return result;
}

async function remove(key_type, key_value){
    key_value = parseKey(key_type, key_value);
    const result = await db.query(
        `DELETE FROM tasks WHERE ${key_type}=`+mysql.escape(key_value)+``
    );
    
    return result;
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
}