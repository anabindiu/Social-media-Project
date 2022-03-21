const { Password } = require("@mui/icons-material")
const express = require("express")
const app = express()
const mysql = require("mysql")
const cors = require("cors")

app.use(cors())
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'project'
});

app.post('/create', (req, res) => {
    const Email = req.body.Email;
    const Username = req.body.Username;
    const Password = req.body.Password;
    const Birth_Date = req.body.Birth_Date;
    const Name = req.body.Name;
    const Profile_Pic = req.body.Profile_Pic;
    const UserEmail = req.body.UserEmail;

    db.query(
        "INSERT INTO `profile` (Name, Email, Username, Password, B_Date, Profile_Pic, User_Email) VALUES (?,?,?,?,?,?,?)", 
        [Name, Email, Username, Password, Birth_Date, Profile_Pic, null], 
        (err, result) => {
            if(err){
                console.log(err);
            }
            else{
                res.send("Values inserted")
            }
        });
})

app.listen(3001, ()=>console.log("Working buddy"))