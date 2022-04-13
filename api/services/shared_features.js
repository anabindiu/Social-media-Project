const db = require('./db');

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

async function getAll(){
    const data = await db.query(
        `SELECT Profile_ID_Author, Profile_ID_Recipient, Permissions, Feature_ID, Feature_type
        FROM shared_features`
    );
    return(data);
}

async function getOne(key_type1, key_type2, key_value1, key_value2){
    key_value1 = parseKey(key_type1, key_value1);
    key_value2 = parseKey(key_type2, key_value2);
    if(key_value2 == null){
        const data = await db.query(
            `SELECT Profile_ID_Author, Profile_ID_Recipient, Permissions, Feature_ID, Feature_type
            FROM shared_features
            WHERE ${key_type1}=${key_value1}`
        );
        return(data);
    }
    else{
        const data = await db.query(
            `SELECT Profile_ID_Author, Profile_ID_Recipient, Permissions, Feature_ID, Feature_type
            FROM shared_features
            WHERE ${key_type1}=${key_value1} AND ${key_type2}=${key_value2}`
        );
        return(data);
    }
}

async function create(body){
    const result = await db.query(
        `INSERT INTO shared_features 
        (Profile_ID_Author, Profile_ID_Recipient, Permissions, Feature_ID, Feature_type) 
        VALUES 
        (${body.Profile_ID_Author}, ${body.Profile_ID_Recipient}, "${body.Permissions}", ${body.Feature_ID}, "${body.Feature_type}")`
    );
    
    return result;
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
    

    return result;
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
    
    return result;
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
}