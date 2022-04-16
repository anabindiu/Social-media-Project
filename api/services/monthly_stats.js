const db = require('./db');
const mysql = require ('mysql')

async function getAll(){
    const data = await db.query(
        `SELECT * FROM monthly_stats`
    );
    return(data);
}

async function getOne(key_type1, key_type2, key_type3, key_value1, key_value2, key_value3){

    if(key_value2 == null){
        const data = await db.query(
            `SELECT *
            FROM monthly_stats
            WHERE ${key_type1}=`+mysql.escape(key_value1)
        );
        return(data);
    }

    else if(key_value3 == null){
        const data = await db.query(
            `SELECT *
            FROM monthly_stats
            WHERE ${key_type1}= `+mysql.escape(key_value1)+` AND  ${key_type2}=`+mysql.escape(key_value2) 
        );
        return(data);
    }
    else{
        const data = await db.query(
            `SELECT *
            FROM monthly_stats
            WHERE ${key_type1}= `+mysql.escape(key_value1)+` AND  ${key_type2}=`+mysql.escape(key_value2) + ` AND  ${key_type3}=`+mysql.escape(key_value3)
        );
        return(data);
    }
}

async function create(body){
    const result = await db.query(
        `INSERT INTO monthly_stats 
        VALUES 
        (`+mysql.escape(body.Profile_ID)+`, `+mysql.escape(body.Month)+`, `+mysql.escape(body.Year)+`, `+mysql.escape(body.Total_Events)+`, `+mysql.escape(body.Total_Tasks)+`,`+mysql.escape(body.Total_Notes)+`)`
    );
    
    return result;
}

async function update(key_type1, key_type2, key_type3, key_value1, key_value2, key_value3, body){


    console.log(body);
    
    const result = await db.query(
        `UPDATE monthly_stats 
        SET Profile_ID = `+mysql.escape(body.Profile_ID)+`, Month=`+mysql.escape(body.Month)+`, Year=`+mysql.escape(body.Year)+`, Total_Events= `+mysql.escape(body.Total_Events)+`, Total_Tasks= `+mysql.escape(body.Total_Tasks)+`, Total_Notes=`+mysql.escape(body.Total_Notes)+`
        WHERE ${key_type1}= `+mysql.escape(key_value1)+` AND  ${key_type2}=`+mysql.escape(key_value2) + ` AND  ${key_type3}=`+mysql.escape(key_value3)    );
    
    return result;
}

async function remove(key_type1, key_type2, key_type3,  key_value1, key_value2, key_value3){

    const result = await db.query(
        `DELETE FROM monthly_stats WHERE ${key_type1}= `+mysql.escape(key_value1)+` AND  ${key_type2}=`+mysql.escape(key_value2) + ` AND  ${key_type3}=`+mysql.escape(key_value3)
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