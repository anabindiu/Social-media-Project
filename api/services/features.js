const db = require('./db');

function parseKey(key_type, key_value){
    switch(key_type){
        case "Profile_ID":
            return key_value;
        case "Profile_Email":
            return `\"${key_value}\"`;
        case "Profile_Username":
            return `\"${key_value}\"`;
        default:
            return key_value;
    }
}

async function getAll(){
    const data = await db.query(
        `SELECT Profile_ID, Profile_Email, Profile_Username, Schedule_ID, Notes_ID, Tasks_ID, Setting_ID
        FROM features`
    );
    return(data);
}

async function getOne(key_type, key_value){
    key_value = parseKey(key_type, key_value);
    const data = await db.query(
        `SELECT Profile_ID, Profile_Email, Profile_Username, Schedule_ID, Notes_ID, Tasks_ID, Setting_ID
        FROM features
        WHERE ${key_type}=${key_value}`
    );
    return(data);
}

async function create(body){
    const result = await db.query(
        `INSERT INTO features 
        (Profile_ID, Profile_Email, Profile_Username, Schedule_ID, Notes_ID, Tasks_ID, Setting_ID) 
        VALUES 
        (${body.Profile_ID}, "${body.Profile_Email}", "${body.Profile_Username}", ${body.Schedule_ID}, ${body.Notes_ID}, ${body.Tasks_ID}, ${body.Setting_ID})`
    );
    
    return result;
}

async function update(key_type, key_value, body){
    key_value = parseKey(key_type, key_value);
    const result = await db.query(
        `UPDATE features 
        SET Profile_ID=${body.Profile_ID}, Profile_Email="${body.Profile_Email}", Profile_Username="${body.Profile_Username}", Schedule_ID=${body.Schedule_ID}, Notes_ID=${body.Notes_ID}, Tasks_ID=${body.Tasks_ID}, Setting_ID=${body.Setting_ID},
        WHERE ${key_type}=${key_value}` 
    );
    
    return result;
}

async function remove(key_type, key_value){
    key_value = parseKey(key_type, key_value);
    const result = await db.query(
        `DELETE FROM features WHERE ${key_type}=${key_value}`
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