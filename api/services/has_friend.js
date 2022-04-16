const db = require('./db');
const mysql = require('mysql')


async function getAll(){
    const data = await db.query(
        `SELECT ID_1, ID_2
        FROM has_friend`
    );
    return(data);
}

async function getOne(key_type1, key_type2, key_value1, key_value2){

    if(key_value2 == null){
        const data = await db.query(
            `SELECT ID_1, ID_2
            FROM has_friend
            WHERE ${key_type1}= ` +mysql.escape(key_value1)
        );
        return(data);
    }
    else{
        const data = await db.query(
            `SELECT ID_1, ID_2
            FROM has_friend
            WHERE ${key_type1}= `+mysql.escape(key_value1) + ` AND ${key_type2}= `+mysql.escape(key_value2)
        );
        return(data);
    }
}

async function create(body){
    const result = await db.query(
        `INSERT INTO has_friend 
        (ID_1, ID_2) 
        VALUES 
        (`+mysql.escape(body.ID_1)+`, `+mysql.escape(body.ID_2)+`)`
    );
    
    return result;
}

async function update(key_type1, key_type2, key_value1, key_value2, body){


    const result = await db.query(
        `UPDATE has_friend 
        SET ID_1=` + mysql.escape(body.ID_1)+`, ID_2=` + mysql.escape(body.ID_2)+`
        WHERE ${key_type1}=` + mysql.escape(key_value1)+` AND ${key_type2}=` + mysql.escape(key_value2)
    );

    return result;
}

async function remove(key_type1, key_type2, key_value1, key_value2){

    
    const result = await db.query(
        `DELETE FROM has_friend  WHERE ${key_type1}=` + mysql.escape(key_value1)+` AND ${key_type2}=` + mysql.escape(key_value2)
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