const db = require('./db');
const mysql = require('mysql');

async function getAll(){
    const data = await db.query(
        `SELECT ID, Notes_ID, Date_Created, Last_Modified, Title, Content
        FROM note`
    );
    return(data);
}

async function getOne(key_type1, key_type2, key_value1, key_value2){
    if(key_value2 == null){
        const data = await db.query(
            `SELECT ID, Notes_ID, Date_Created, Last_Modified, Title, Content
            FROM note
            WHERE ${key_type1}=`+mysql.escape(key_value1)+``
        );
        return(data);
    }
    else{
        const data = await db.query(
            `SELECT ID, Notes_ID, Date_Created, Last_Modified, Title, Content
            FROM note
            WHERE ${key_type1}=`+mysql.escape(key_value1)+` AND ${key_type2}=`+mysql.escape(key_value2)+``
        );
        return(data);
    }
}

async function create(body){
    const result = await db.query(
        `INSERT INTO note 
        (Notes_ID, Date_Created, Last_Modified, Title, Content) 
        VALUES 
        (`+mysql.escape(body.Notes_ID)+`, `+mysql.escape(body.Date_Created)+`, `+mysql.escape(body.Last_Modified)+`, `+mysql.escape(body.Title)+`, `+mysql.escape(body.Content)+`)`
    );
    
    return result;
}

async function update(key_type1, key_type2, key_value1, key_value2, body){
    if(key_value2 == null){
        const result = await db.query(
            `UPDATE note 
            SET Notes_ID=`+mysql.escape(body.Notes_ID)+`, Date_Created=`+mysql.escape(body.Date_Created)+`, Last_Modified=`+mysql.escape(body.Last_Modified)+`, Title=`+mysql.escape(body.Title)+`, Content=`+mysql.escape(body.Content)+`
            WHERE ${key_type1}=`+mysql.escape(key_value1)+``
        );

        return result;
    }
    else{
        const result = await db.query(
            `UPDATE note 
            SET Notes_ID=`+mysql.escape(body.Notes_ID)+`, Date_Created=`+mysql.escape(body.Date_Created)+`, Last_Modified=`+mysql.escape(body.Last_Modified)+`, Title=`+mysql.escape(body.Title)+`, Content=`+mysql.escape(body.Content)+` q
            WHERE ${key_type1}=`+mysql.escape(key_value1)+` AND ${key_type2}=`+mysql.escape(key_value2)+`` 
        );

        return result;
    }
}

async function remove(key_type1, key_type2, key_value1, key_value2){
    if(key_value2 == null){
        const result = await db.query(
            `DELETE FROM note WHERE ${key_type1}=`+mysql.escape(key_value1)+``
        );
        return result;
    }
    else{
        const result = await db.query(
            `DELETE FROM note WHERE ${key_type1}=`+mysql.escape(key_value1)+` AND ${key_type2}=`+mysql.escape(key_value2)+``
        );
        return result;
    }
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
}