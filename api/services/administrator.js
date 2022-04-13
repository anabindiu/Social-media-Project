const db = require('./db');

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

async function getAll(){
    const data = await db.query(
        `SELECT ID, Email
        FROM administrator`
    );
    return(data);
}

async function getOne(key_type, key_value){
    key_value = parseKey(key_type, key_value);
    const data = await db.query(
        `SELECT ID, Email
        FROM administrator
        WHERE ${key_type}=${key_value}`
    );
    return(data);
}

async function create(body){
    const result = await db.query(
        `INSERT INTO administrator 
        (Email) 
        VALUES 
        ("${body.Email}")`
    );
    
    return result;
}

async function update(key_type, key_value, body){
    key_value = parseKey(key_type, key_value);
    const result = await db.query(
        `UPDATE administrator 
        SET Email="${body.Email}"
        WHERE ${key_type}=${key_value}` 
    );
    
    return result;
}

async function remove(key_type, key_value){
    key_value = parseKey(key_type, key_value);
    const result = await db.query(
        `DELETE FROM administrator WHERE ${key_type}=${key_value}`
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