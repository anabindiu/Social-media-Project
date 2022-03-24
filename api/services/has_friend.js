const db = require('./db');
const helper = require('../helper');
const config = require('../config');

function parseKey(key_type, key_value){
    switch(key_type){
        case "ID_1":
            return key_value;
        case "ID_2":
            return key_value;
        default:
            return key_value;
    }
}

async function getAll(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT ID_1, ID_2
        FROM has_friend LIMIT ${offset},${config.listPerPage}`
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
            `SELECT ID_1, ID_2
            FROM has_friend
            WHERE ${key_type1}=${key_value1}`
        );
    }
    else{
        const rows = await db.query(
            `SELECT ID_1, ID_2
            FROM has_friend
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
        `INSERT INTO has_friend 
        (ID_1, ID_2) 
        VALUES 
        (${body.ID_1}, ${body.ID_2})`
    );
    
    let message = 'Error in creating has_friend ';
    
    if (result.affectedRows) {
        message = 'has_friend created successfully';
    }
    
    return {message};
}

async function update(key_type1, key_type2, key_value1, key_value2, body){
    key_value1 = parseKey(key_type1, key_value1);
    key_value2 = parseKey(key_type2, key_value2);

    const result = await db.query(
        `UPDATE has_friend 
        SET ID_1=${body.ID_1}, ID_2=${body.ID_2}
        WHERE ${key_type1}=${key_value1} AND ${key_type2}=${key_value2}` 
    );

    let message = 'Error in updating has_friend';
    
    if (result.affectedRows) {
        message = 'has_friend updated successfully';
    }
    
    return {message};
}

async function remove(key_type1, key_type2, key_value1, key_value2){
    key_value1 = parseKey(key_type1, key_value1);
    key_value2 = parseKey(key_type2, key_value2);
    
    const result = await db.query(
        `DELETE FROM has_friend WHERE ${key_type1}=${key_value1} AND ${key_type2}=${key_value2}`
    );
    
    let message = 'Error in deleting has_friend';
    
    if (result.affectedRows) {
        message = 'has_friend deleted successfully';
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