const db = require('./db');
const helper = require('../helper');
const config = require('../config');

function parseKey(key_type, key_value){
    switch(key_type){
        case "Profile_ID_Author":
            return key_value;
        case "Profile_ID_Recipient":
            return key_value;
        case "Feature_ID":
            return key_value;
        case "Feature_type":
            return `\"${key_value}\"`;
        default:
            return key_value;
    }
}

async function getAll(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT Profile_ID_Author, Profile_ID_Recipient, Permissions, Feature_ID, Feature_type
        FROM shared_features LIMIT ${offset},${config.listPerPage}`
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
            `SELECT Profile_ID_Author, Profile_ID_Recipient, Permissions, Feature_ID, Feature_type
            FROM shared_features
            WHERE ${key_type1}=${key_value1}`
        );
    }
    else{
        const rows = await db.query(
            `SELECT Profile_ID_Author, Profile_ID_Recipient, Permissions, Feature_ID, Feature_type
            FROM shared_features
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
        `INSERT INTO shared_features 
        (Profile_ID_Author, Profile_ID_Recipient, Permissions, Feature_ID, Feature_type) 
        VALUES 
        (${body.Profile_ID_Author}, ${body.Profile_ID_Recipient}, "${body.Permissions}", ${body.Feature_ID}, "${body.Feature_type}")`
    );
    
    let message = 'Error in creating shared_features ';
    
    if (result.affectedRows) {
        message = 'shared_features created successfully';
    }
    
    return {message};
}

async function update(key_type1, key_type2, key_value1, key_value2, body){
    key_value1 = parseKey(key_type1, key_value1);
    key_value2 = parseKey(key_type2, key_value2);

    if(key_value2 == null){
        const result = await db.query(
            `UPDATE shared_features 
            SET Profile_ID_Author=${body.Profile_ID_Author}, Profile_ID_Recipient=${body.Profile_ID_Recipient}, Permissions="${body.Permissions}", Feature_ID=${body.Feature_ID}, Feature_type="${body.Feature_type}"
            WHERE ${key_type1}=${key_value1}`
        );
    }
    else{
        const result = await db.query(
            `UPDATE shared_features 
            SET Profile_ID_Author=${body.Profile_ID_Author}, Profile_ID_Recipient=${body.Profile_ID_Recipient}, Permissions="${body.Permissions}", Feature_ID=${body.Feature_ID}, Feature_type="${body.Feature_type}"
            WHERE ${key_type1}=${key_value1} AND ${key_type2}=${key_value2}` 
        );
    }
    

    let message = 'Error in updating shared_features';
    
    if (result.affectedRows) {
        message = 'shared_features updated successfully';
    }
    
    return {message};
}

async function remove(key_type1, key_type2, key_value1, key_value2){
    key_value1 = parseKey(key_type1, key_value1);
    key_value2 = parseKey(key_type2, key_value2);
    
    if(key_value2 == null){
        const result = await db.query(
            `DELETE FROM shared_features WHERE ${key_type1}=${key_value1}`
        );
    }
    else{
        const result = await db.query(
            `DELETE FROM shared_features WHERE ${key_type1}=${key_value1} AND ${key_type2}=${key_value2}`
        );
    }
    
    let message = 'Error in deleting shared_features';
    
    if (result.affectedRows) {
        message = 'shared_features deleted successfully';
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