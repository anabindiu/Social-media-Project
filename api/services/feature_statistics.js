const db = require('./db');
const mysql = require('mysql')


async function getAll(){
    const data = await db.query(
        `SELECT ID, Profile_ID, Statistics_type, Title
        FROM feature_statistics`
    );
    return(data);
}

async function getOne(key_type, key_value){
    const data = await db.query(
        `ID, Profile_ID, Statistics_type, Title
        FROM feature_statistics
        WHERE ${key_type}= ` + mysql.escape(key_value) 
    );
    return(data);
}

async function create(body){
    const result = await db.query(
        `INSERT INTO feature_statistics 
        (Profile_ID, Statistics_type, Title) 
        VALUES 
        (` + mysql.escape(body.Profile_ID) +`, ` + mysql.escape(body.Statistics_type) +`, ` + mysql.escape(body.Title) +`)`
    );
    
    return result;
}

async function update(key_type, key_value, body){
    const result = await db.query(
        `UPDATE feature_statistics 
        SET Profile_ID=` + mysql.escape(body.Profile_ID) +`, Statistics_type=` + mysql.escape(body.Statistics_type) +`, Title=` + mysql.escape(body.Title) +`
        WHERE ${key_type}= `  + mysql.escape(key_value) 
    );
    
    return result;
}

async function remove(key_type, key_value){
    const result = await db.query(
        `DELETE FROM feature_statistics WHERE ${key_type}= ` + mysql.escape(key_value) 
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