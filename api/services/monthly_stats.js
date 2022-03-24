const db = require('./db');
const helper = require('../helper');
const config = require('../config');

function parseKey(key_type, key_value){
    switch(key_type){
        case "Feature_Stats_ID":
            return key_value;
        case "Month_Year":
            return `\"${key_value}\"`;
        default:
            return key_value;
    }
}

async function getAll(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT Feature_Stats_ID, Month_Year, Total_Events, Total_Tasks, Total_Notes, Total_Reminders, Year
        FROM monthly_stats LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};
    
    return {
        data,
        meta
    }
}

async function getOne(key_type1, key_type2, key_value1, key_value2){
    key_value1 = parseKey(key_type1, key_value1);
    key_value2 = parseKey(key_type2, key_value2);
    if(key_value2 == null){
        const rows = await db.query(
            `SELECT Feature_Stats_ID, Month_Year, Total_Events, Total_Tasks, Total_Notes, Total_Reminders, Year
            FROM monthly_stats
            WHERE ${key_type1}=${key_value1}`
        );
    }
    else{
        const rows = await db.query(
            `SELECT Feature_Stats_ID, Month_Year, Total_Events, Total_Tasks, Total_Notes, Total_Reminders, Year
            FROM monthly_stats
            WHERE ${key_type1}=${key_value1} AND ${key_type2}=${key_value2}`
        );
    }
    
    const data = helper.emptyOrRows(rows);
    
    return {
        data
    }
}

async function create(body){
    const result = await db.query(
        `INSERT INTO monthly_stats 
        (Feature_Stats_ID, Month_Year, Total_Events, Total_Tasks, Total_Notes, Total_Reminders, Year) 
        VALUES 
        (${body.Feature_Stats_ID}, "${body.Month_Year}", ${body.Total_Events}, ${body.Total_Tasks}, ${body.Total_Notes}, ${body.Total_Reminders}, "${body.Year}")`
    );
    
    let message = 'Error in creating monthly_stats ';
    
    if (result.affectedRows) {
        message = 'monthly_stats created successfully';
    }
    
    return {message};
}

async function update(key_type1, key_type2, key_value1, key_value2, body){
    key_value1 = parseKey(key_type1, key_value1);
    key_value2 = parseKey(key_type2, key_value2);
    
    const result = await db.query(
        `UPDATE monthly_stats 
        SET Feature_Stats_ID=${body.Feature_Stats_ID}, Month_Year="${body.Month_Year}", Total_Events=${body.Total_Events}, Total_Tasks=${body.Total_Tasks}, Total_Notes=${body.Total_Notes}, Total_Reminders=${body.Total_Reminders}, Year="${body.Year}"
        WHERE ${key_type1}=${key_value1} AND ${key_type2}=${key_value2}` 
    );
    
    let message = 'Error in updating monthly_stats';
    
    if (result.affectedRows) {
        message = 'monthly_stats updated successfully';
    }
    
    return {message};
}

async function remove(key_type1, key_type2, key_value1, key_value2){
    key_value1 = parseKey(key_type1, key_value1);
    key_value2 = parseKey(key_type2, key_value2);

    const result = await db.query(
        `DELETE FROM monthly_stats WHERE ${key_type1}=${key_value1} AND ${key_type2}=${key_value2}`
    );
    
    let message = 'Error in deleting monthly_stats';
    
    if (result.affectedRows) {
        message = 'monthly_stats deleted successfully';
    }
    
    return {message};
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
}