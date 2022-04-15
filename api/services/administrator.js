const db = require('./db');
const mysql = require('mysql');

async function getAll(){
    const data = await db.query(
        `SELECT ID, Email
        FROM administrator`
    );
    return(data);
}

async function getOne(key_type, key_value){
    const data = await db.query(
        `SELECT ID, Email
        FROM administrator
        WHERE ${key_type}=` + (mysql.escape(key_value))
    );
    return(data);
}

async function create(body){
    const result = await db.query(
        `INSERT INTO administrator 
        (Email) 
        VALUES 
        (` + mysql.escape(body.Email) + `)`
    );
    
    return result;
}

async function update(key_type, key_value, body){
    const result = await db.query(
        `UPDATE administrator 
        SET Email="${body.Email}"
        WHERE ${key_type}= ` + mysql.escape(key_value) 
    );
    
    return result;
}

async function remove(key_type, key_value){
    const result = await db.query(
        `DELETE FROM administrator WHERE ${key_type}= ` + mysql.escape(key_value) 
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