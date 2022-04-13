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
        `SELECT ID, Schedule_ID, Location, Description, Title, Start_Date, End_Date
        FROM event`
    );
    return(data);
}

async function getOne(key_type, key_value){
    key_value = parseKey(key_type, key_value);
    const data = await db.query(
        `SELECT ID, Schedule_ID, Location, Description, Title, Start_Date, End_Date
        FROM event
        WHERE ${key_type}=${key_value}`
    );
    return(data);
}

async function create(body){
    const result = await db.query(
        `INSERT INTO event 
        (Schedule_ID, Location, Description, Title, Start_Date, End_Date) 
        VALUES 
        (${body.Schedule_ID}, "${body.Location}", "${body.Description}", "${body.Title}", "${body.Start_Date}", "${body.End_Date}")`
    );
    
    return result;
}

async function update(key_type, key_value, body){
    key_value = parseKey(key_type, key_value);
    const result = await db.query(
        `UPDATE event 
        SET Schedule_ID=${body.Schedule_ID}, Location="${body.Location}", Description="${body.Description}", Title="${body.Title}", Start_Date="${body.Start_Date}", End_Date="${body.End_Date}"
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