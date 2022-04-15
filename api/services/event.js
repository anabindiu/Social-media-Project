const db = require('./db');

function parseKey(key_type, key_value){
    switch(key_type){
        case "ID":
            return key_value;
        case "Schedule_ID":
            return key_value;
        default:
            return key_value;
    }
}

async function getAll(){
    const data = await db.query(
        `SELECT ID, Schedule_ID, Title, Description, Location, Day, Start_Time, End_Time, Label
        FROM event`
    );
    return(data);
}

async function getOne(key_type, key_value){
    key_value = parseKey(key_type, key_value);
    const data = await db.query(
        `SELECT ID, Schedule_ID, Title, Description, Location, Day, Start_Time, End_Time, Label
        FROM event
        WHERE ${key_type}=${key_value}`
    );
    return(data);
}

async function create(body){
    const result = await db.query(
        `INSERT INTO event 
        (Schedule_ID, Title, Description, Location, Day, Start_Time, End_Time, Label) 
        VALUES 
        (${body.Schedule_ID}, "${body.Title}", "${body.Description}", "${body.Location}", "${body.Day}", ${body.Start_Time}, ${body.End_Time}, "${body.Label}")`
    );
    
    return result;
}

async function update(key_type, key_value, body){
    key_value = parseKey(key_type, key_value);
    const result = await db.query(
        `UPDATE event 
        SET Schedule_ID=${body.Schedule_ID}, Title="${body.Title}", Description="${body.Description}", Location="${body.Location}", Day="${body.Day}", Start_Time=${body.Start_Time}, End_Time=${body.End_Time}, Label="${body.Label}"
        WHERE ${key_type}=${key_value}` 
    );
    
    return result;
}

async function remove(key_type, key_value){
    key_value = parseKey(key_type, key_value);
    const result = await db.query(
        `DELETE FROM event WHERE ${key_type}=${key_value}`
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