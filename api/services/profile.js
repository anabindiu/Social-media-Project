const db = require('./db');
const mysql = require('mysql')

async function getAll(){
    const data = await db.query(
        `SELECT ID, Email, Username, Password, B_Date, Name, Profile_Pic
        FROM profile`
    );
    return(data);
}

async function getOne(key_type, key_value){

    const data = await db.query(
        `SELECT ID, Email, Username, Password, B_Date, Name, Profile_Pic
        FROM profile
        WHERE ${key_type} = ` + mysql.escape(key_value)
    ); 
    return(data);
}

async function create(body){
    console.log(body);

    const bcrypt = require("bcryptjs");
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(body.Password, salt);

    const result = await db.query(
        `INSERT INTO profile 
        (Email, Username, Password, B_Date, Name, Profile_Pic) 
        VALUES 
        (` + mysql.escape(body.Email) + `, ` + mysql.escape(body.Username) + `,` + mysql.escape(hashedPass) + `, ` + mysql.escape(body.B_Date) + `, ` + mysql.escape(body.Name) + `, ` + mysql.escape(body.Profile_Pic) + `)`
    );
    
    return result;
}

async function update(key_type, key_value, body){

    const bcrypt = require("bcryptjs");
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(body.Password, salt);


    const result = await db.query(
        `UPDATE profile 
        SET Email= ` + mysql.escape(body.Email) + `, Username=` + mysql.escape(body.Username) + `, Password=` + mysql.escape(hashedPass) + `, B_Date=` + mysql.escape(body.B_Date) + `, Name=` + mysql.escape(body.Name) + `, Profile_Pic=` + mysql.escape(body.Profile_Pic) + `
        WHERE ${key_type}=` + mysql.escape(key_value) 
    );
    
    return result;
}

async function remove(key_type, key_value){
    const result = await db.query(
        `DELETE FROM profile WHERE ${key_type}=` + mysql.escape(key_value) 
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