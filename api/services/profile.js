const db = require('./db');

function parseKey(key_type, key_value){
    switch(key_type){
        case "ID":
            return key_value;
        case "Email":
            return `\"${key_value}\"`;
        case "Username":
            return `\"${key_value}\"`;
        default:
            return key_value;
    }
}

async function getAll(){
    const data = await db.query(
        `SELECT ID, Email, Username, Password, B_Date, Name, Profile_Pic
        FROM profile`
    );
    return(data);
}

async function getOne(key_type, key_value){
    key_value = parseKey(key_type, key_value);
    const data = await db.query(
        `SELECT ID, Email, Username, Password, B_Date, Name, Profile_Pic
        FROM profile
        WHERE ${key_type}=${key_value}`,
    );
    return(data);
}

async function create(body){
    const result = await db.query(
        `INSERT INTO profile 
        (Email, Username, Password, B_Date, Name, Profile_Pic) 
        VALUES 
        ("${body.Email}", "${body.Username}", "${body.Password}", "${body.B_Date}", "${body.Name}", "${body.Profile_Pic}")`
    );
    
    return result;
}

async function update(key_type, key_value, body){
    key_value = parseKey(key_type, key_value);
    const result = await db.query(
        `UPDATE profile 
        SET Email="${body.Email}", Username="${body.Username}", Password="${body.Password}", B_Date="${body.B_Date}", Name="${body.Name}", Profile_Pic="${body.Profile_Pic}"
        WHERE ${key_type}=${key_value}` 
    );
    
    return result;
}

async function remove(key_type, key_value){
    key_value = parseKey(key_type, key_value);
    const result = await db.query(
        `DELETE FROM profile WHERE ${key_type}=${key_value}`
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