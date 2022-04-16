const db = require('./db');
const mysql = require('mysql')

async function getAll(){
    const data = await db.query(
        `SELECT Profile_ID_Author, Profile_ID_Recipient, Permissions, Feature_ID, Feature_type
        FROM shared_features`
    );
    return(data);
}

async function getOne(key_type1, key_type2, key_value1, key_value2){
    if(key_value2 == null){
        const data = await db.query(
            `SELECT Profile_ID_Author, Profile_ID_Recipient, Permissions, Feature_ID, Feature_type
            FROM shared_features
            WHERE ${key_type1}=`+mysql.escape(key_value1)+``
        );
        return(data);
    }
    else{
        const data = await db.query(
            `SELECT Profile_ID_Author, Profile_ID_Recipient, Permissions, Feature_ID, Feature_type
            FROM shared_features
            WHERE ${key_type1}=`+mysql.escape(key_value1)+` AND ${key_type2}=`+mysql.escape(key_value2)+``
        );
        return(data);
    }
}

async function create(body){
    const result = await db.query(
        `INSERT INTO shared_features 
        (Profile_ID_Author, Profile_ID_Recipient, Permissions, Feature_ID, Feature_type) 
        VALUES 
        (`+mysql.escape(body.Profile_ID_Author)+`, `+mysql.escape(body.Profile_ID_Recipient)+`, `+mysql.escape(body.Permissions)+`, `+mysql.escape(body.Feature_ID)+`, `+mysql.escape(body.Feature_type)+`)`
    );
    
    return result;
}

async function update(key_type1, key_type2, key_value1, key_value2, body){
    if(key_value2 == null){
        const result = await db.query(
            `UPDATE shared_features 
            SET Profile_ID_Author=`+mysql.escape(body.Profile_ID_Author)+`, Profile_ID_Recipient=`+mysql.escape(body.Profile_ID_Recipient)+`, Permissions=`+mysql.escape(body.Permissions)+`, Feature_ID=`+mysql.escape(body.Feature_ID)+`, Feature_type=`+mysql.escape(body.Feature_type)+`
            WHERE ${key_type1}=`+mysql.escape(key_value1)+``
        );
        return result;
    }
    else{
        const result = await db.query(
            `UPDATE shared_features 
            SET Profile_ID_Author=`+mysql.escape(body.Profile_ID_Author)+`, Profile_ID_Recipient=`+mysql.escape(body.Profile_ID_Recipient)+`, Permissions=`+mysql.escape(body.Permissions)+`, Feature_ID=`+mysql.escape(body.Feature_ID)+`, Feature_type=`+mysql.escape(body.Feature_type)+`
            WHERE ${key_type1}=`+mysql.escape(key_value1)+` AND ${key_type2}=`+mysql.escape(key_value2)+`` 
        );
        return result;
    }
}

async function remove(key_type1, key_type2, key_value1, key_value2){
    if(key_value2 == null){
        const result = await db.query(
            `DELETE FROM shared_features WHERE ${key_type1}=`+mysql.escape(key_value1)+``
        );
        return result;
    }
    else{
        const result = await db.query(
            `DELETE FROM shared_features WHERE ${key_type1}=`+mysql.escape(key_value1)+` AND ${key_type2}=`+mysql.escape(key_value2)+``
        );
        return result;
    }
    
    return result;
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
}
