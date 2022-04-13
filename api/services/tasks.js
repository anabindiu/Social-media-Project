const db = require('./db');

function parseKey(key_type, key_value){
    switch(key_type){
        case "ID":
            return key_value;
        case "Profile_ID":
            return key_value;
        case "Header":
            return `\"${key_value}\"`;
        default:
            return key_value;
    }
}

async function getAll(){
    const data = await db.query(
        `SELECT ID, Profile_ID, Header
        FROM tasks`
    );
    return(data);
}

async function getOne(key_type, key_value){
    key_value = parseKey(key_type, key_value);
    const data = await db.query(
        `SELECT ID, Profile_ID, Header
        FROM tasks
        WHERE ${key_type}=${key_value}`
    );
    return(data);
}

async function create(body){
    const result = await db.query(
        `INSERT INTO tasks 
        (Profile_ID, Header) 
        VALUES 
        (${body.Profile_ID}, "${body.Header}")`
    );
    
    return result;
}

async function update(key_type, key_value, body){
    key_value = parseKey(key_type, key_value);
    const result = await db.query(
        `UPDATE tasks 
        SET Profile_ID=${body.Profile_ID}, Header="${body.Header}"
        WHERE ${key_type}=${key_value}` 
    );
    
    return result;
}

async function remove(key_type, key_value){
    key_value = parseKey(key_type, key_value);
    const result = await db.query(
        `DELETE FROM tasks WHERE ${key_type}=${key_value}`
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