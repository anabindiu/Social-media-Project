const db = require('./db');
const mysql = require('mysql');

async function getAll(){
    const data = await db.query(
        `SELECT ID, Tasks_ID, Title, Description, Location, Deadline, Completion_Status
        FROM task`
    );
    return(data);
}

async function getOne(key_type1, key_type2, key_value1, key_value2){
    if(key_value2 == null){
        const data = await db.query(
            `SELECT ID, Tasks_ID, Title, Description, Location, Deadline, Completion_Status
            FROM task
            WHERE ${key_type1}=`+mysql.escape(key_value1)+``
        );
        return(data);
    }
    else{
        const data = await db.query(
            `SELECT ID, Tasks_ID, Title, Description, Location, Deadline, Completion_Status
            FROM task
            WHERE ${key_type1}=`+mysql.escape(key_value1)+` AND ${key_type2}=`+mysql.escape(key_value2)+``
        );
        return(data);
    }
}

async function create(body){
    const result = await db.query(
        `INSERT INTO task 
        (Tasks_ID, Title, Description, Location, Deadline, Completion_Status) 
        VALUES 
        (`+mysql.escape(body.Tasks_ID)+`, `+mysql.escape(body.Title)+`, `+mysql.escape(body.Description)+`, `+mysql.escape(body.Location)+`, `+mysql.escape(body.Deadline)+`, `+mysql.escape(body.Completion_Status)+`)`
    );
    
    return result;
}

async function update(key_type1, key_type2, key_value1, key_value2, body){
    if(key_value2 == null){
        const result = await db.query(
            `UPDATE task 
            SET Tasks_ID=`+mysql.escape(body.Tasks_ID)+`, Title=`+mysql.escape(body.Title)+`, Description=`+mysql.escape(body.Description)+`, Location=`+mysql.escape(body.Location)+`, Deadline=`+mysql.escape(body.Deadline)+`, Completion_Status=`+mysql.escape(body.Completion_Status)+`
            WHERE ${key_type1}=`+mysql.escape(key_value1)+``
        );

        return result;
    }
    else{
        const result = await db.query(
            `UPDATE task 
            SET Tasks_ID=`+mysql.escape(body.Tasks_ID)+`, Title=`+mysql.escape(body.Title)+`, Description=`+mysql.escape(body.Description)+`, Location=`+mysql.escape(body.Location)+`, Deadline=`+mysql.escape(body.Deadline)+`, Completion_Status=`+mysql.escape(body.Completion_Status)+`
            WHERE ${key_type1}=`+mysql.escape(key_value1)+` AND ${key_type2}=`+mysql.escape(key_value2)+`` 
        );

        return result;
    }
}

async function remove(key_type1, key_type2, key_value1, key_value2){
    if(key_value2 == null){
        const result = await db.query(
            `DELETE FROM task WHERE ${key_type1}=`+mysql.escape(key_value1)+``
        );
        return result;
    }
    else{
        const result = await db.query(
            `DELETE FROM task WHERE ${key_type1}=`+mysql.escape(key_value1)+` AND ${key_type2}=`+mysql.escape(key_value2)+``
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