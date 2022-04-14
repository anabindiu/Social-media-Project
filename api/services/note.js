const db = require('./db');

function parseKey(key_type, key_value){
    switch(key_type){
        case "ID":
            return key_value;
        case "Notes_ID":
            return key_value;
        default:
            return key_value;
    }
}

async function getAll(){
    const data = await db.query(
        `SELECT ID, Notes_ID, Date_Created, Last_Modified, Title, Content
        FROM note`
    );
    return(data);
}

async function getOne(key_type1, key_type2, key_value1, key_value2){
    key_value1 = parseKey(key_type1, key_value1);
    key_value2 = parseKey(key_type2, key_value2);
    if(key_value2 == null){
        const data = await db.query(
            `SELECT ID, Notes_ID, Date_Created, Last_Modified, Title, Content
            FROM note
            WHERE ${key_type1}=${key_value1}`
        );
        return(data);
    }
    else{
        const data = await db.query(
            `SELECT ID, Notes_ID, Date_Created, Last_Modified, Title, Content
            FROM note
            WHERE ${key_type1}=${key_value1} AND ${key_type2}=${key_value2}`
        );
        return(data);
    }
}

async function create(body){
    const result = await db.query(
        `INSERT INTO note 
        (Notes_ID, Date_Created, Last_Modified, Title, Content) 
        VALUES 
        (${body.Notes_ID}, ${body.Date_Created}, ${body.Last_Modified}, "${body.Title}", "${body.Content}")`
    );
    
    return result;
}

async function update(key_type1, key_type2, key_value1, key_value2, body){
    key_value1 = parseKey(key_type1, key_value1);
    key_value2 = parseKey(key_type2, key_value2);

    if(key_value2 == null){
        const result = await db.query(
            `UPDATE note 
            SET Notes_ID=${body.Notes_ID}, Date_Created=${body.Date_Created}, Last_Modified=${body.Last_Modified}, Title="${body.Title}", Content="${body.Content}"
            WHERE ${key_type1}=${key_value1}`
        );

        return result;
    }
    else{
        const result = await db.query(
            `UPDATE note 
            SET Notes_ID=${body.Notes_ID}, Date_Created=${body.Date_Created}, Last_Modified=${body.Last_Modified}, Title="${body.Title}", Content="${body.Content}"
            WHERE ${key_type1}=${key_value1} AND ${key_type2}=${key_value2}` 
        );

        return result;
    }
}

async function remove(key_type1, key_type2, key_value1, key_value2){
    key_value1 = parseKey(key_type1, key_value1);
    key_value2 = parseKey(key_type2, key_value2);
    if(key_value2 == null){
        const result = await db.query(
            `DELETE FROM note WHERE ${key_type1}=${key_value1}`
        );
        return result;
    }
    else{
        const result = await db.query(
            `DELETE FROM note WHERE ${key_type1}=${key_value1} AND ${key_type2}=${key_value2}`
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