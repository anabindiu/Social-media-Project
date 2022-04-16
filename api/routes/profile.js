const express = require("express");
const router = express.Router();
const profile_service = require("../services/profile");

/* GET profile by ALL, ID, Email, Username */
router.get('/', (req, res, next) => {send_query(req, res, next, "GET", null, null);});
router.get('/ID/:ID', (req, res, next) => {send_query(req, res, next, "GET", "ID", req.params.ID);});
router.get('/Email/:Email', (req, res, next) => {send_query(req, res, next, "GET", "Email", req.params.Email);});
router.get('/Username/:Username', (req, res, next) => {send_query(req, res, next, "GET", "Username", req.params.Username);});

/* POST profile */
router.post('/', (req, res, next) => {send_query(req, res, next, "POST", null, null);});

/* PUT profile by ID, Email, Username */
router.put('/ID/:ID', (req, res, next) => {send_query(req, res, next, "PUT", "ID", req.params.ID);});
router.put('/Email/:Email', (req, res, next) => {send_query(req, res, next, "PUT", "Email", req.params.Email);});
router.put('/Username/:Username', (req, res, next) => {send_query(req, res, next, "PUT", "Username", req.params.Username);});

/* DELETE profile by ID, Email, Username */
router.delete('/ID/:ID', (req, res, next) => {send_query(req, res, next, "DELETE", "ID", req.params.ID);});
router.delete('/Email/:Email', (req, res, next) => {send_query(req, res, next, "DELETE", "Email", req.params.Email);});
router.delete('/Username/:Username', (req, res, next) => {send_query(req, res, next, "DELETE", "Username", req.params.Username);});

//Polymorphic function for sending queries to database.
async function send_query(req, res, next, type, key, params){
    try{
        switch(type){
            case "GET":
                if(key == null){
                    res.json(await profile_service.getAll(req.query.page));
                }
                else{
                    res.json(await profile_service.getOne(key, params));
                }
                break;
            case "POST":
                console.log("BODY: ", req.body);
                res.json(await profile_service.create(req.body));
                break;
            case "PUT":
                res.json(await profile_service.update(key, params, req.body));
                break;
            case "DELETE":
                res.json(await profile_service.remove(key, params));
                break;
        }
    }
    catch(err){
        console.error(`Error with ${type} query for ${key} key: `, err.message);
        next(err);
    }
}

module.exports = router;