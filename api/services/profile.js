const db = require('./db');
const helper = require('../helper');
const config = require('../config');

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

async function getAll(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT ID, Email, Username, Password, B_Date, Name, Profile_Pic
        FROM profile LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};
    
    return {
        data,
        meta
    }
}

async function getOne(key_type, key_value){
    key_value = parseKey(key_type, key_value);
    const rows = await db.query(
        `SELECT ID, Email, Username, Password, B_Date, Name, Profile_Pic
        FROM profile
        WHERE ${key_type}=${key_value}`
    );
    const data = helper.emptyOrRows(rows);
    
    return {
        data
    }
}

async function create(body){
    const result = await db.query(
        `INSERT INTO profile 
        (Email, Username, Password, B_Date, Name, Profile_Pic) 
        VALUES 
        ("${body.Email}", "${body.Username}", "${body.Password}", "${body.B_Date}", "${body.Name}", "${body.Profile_Pic}")`
    );
    
    let message = 'Error in creating profile ';
    
    if (result.affectedRows) {
        message = 'Profile created successfully';
    }
    
    return {message};
}

async function update(key_type, key_value, body){
    key_value = parseKey(key_type, key_value);
    const result = await db.query(
        `UPDATE profile 
        SET Email="${body.Email}", Username="${body.Username}", Password="${body.Password}", B_Date="${body.B_Date}", Name="${body.Name}", Profile_Pic="${body.Profile_Pic}"
        WHERE ${key_type}=${key_value}` 
    );
    
    let message = 'Error in updating profile';
    
    if (result.affectedRows) {
        message = 'profile updated successfully';
    }
    
    return {message};
}

async function remove(key_type, key_value){
    key_value = parseKey(key_type, key_value);
    const result = await db.query(
        `DELETE FROM profile WHERE ${key_type}=${key_value}`
    );
    
    let message = 'Error in deleting profile';
    
    if (result.affectedRows) {
        message = 'profile deleted successfully';
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