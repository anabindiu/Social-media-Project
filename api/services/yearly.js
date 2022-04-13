const db = require('./db');

function parseKey(key_type, key_value){
    switch(key_type){
        case "Feature_Stats_ID":
            return key_value;
        case "Year":
            return `\"${key_value}\"`;
        default:
            return key_value;
    }
}

async function getAll(){
    const data = await db.query(
        `SELECT Feature_Stats_ID, Year
        FROM yearly`
    );

    return(data);
}

async function getOne(key_type1, key_type2, key_value1, key_value2){
    key_value1 = parseKey(key_type1, key_value1);
    key_value2 = parseKey(key_type2, key_value2);
    if(key_value2 == null){
        const data = await db.query(
            `SELECT Feature_Stats_ID, Year
            FROM yearly
            WHERE ${key_type1}=${key_value1}`
        );
        return(data);
    }
    else{
        const data = await db.query(
            `SELECT Feature_Stats_ID, Year
            FROM yearly
            WHERE ${key_type1}=${key_value1} AND ${key_type2}=${key_value2}`
        );
        return(data);
    }
}

async function create(body){
    const result = await db.query(
        `INSERT INTO yearly 
        (Feature_Stats_ID, Year) 
        VALUES 
        (${body.Feature_Stats_ID}, "${body.Year}")`
    );
    
    return result;
}

async function update(key_type1, key_type2, key_value1, key_value2, body){
    key_value1 = parseKey(key_type1, key_value1);
    key_value2 = parseKey(key_type2, key_value2);
    
    const result = await db.query(
        `UPDATE yearly 
        SET Feature_Stats_ID=${body.Feature_Stats_ID}, Year="${body.Year}"
        WHERE ${key_type1}=${key_value1} AND ${key_type2}=${key_value2}` 
    );
    
    return result;
}

async function remove(key_type1, key_type2, key_value1, key_value2){
    key_value1 = parseKey(key_type1, key_value1);
    key_value2 = parseKey(key_type2, key_value2);

    const result = await db.query(
        `DELETE FROM yearly WHERE ${key_type1}=${key_value1} AND ${key_type2}=${key_value2}`
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