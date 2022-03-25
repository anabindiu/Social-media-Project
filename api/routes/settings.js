const express = require("express");
const router = express.Router();
const settings_service = require("../services/settings");

/* GET settings by ALL, ID, Profile_ID */
router.get('/', (req, res, next) => {send_query(req, res, next, "GET", null, null);});
router.get('/ID/:ID', (req, res, next) => {send_query(req, res, next, "GET", "ID", req.params.ID);});
router.get('/Profile_ID/:Profile_ID', (req, res, next) => {send_query(req, res, next, "GET", "Profile_ID", req.params.Profile_ID);});

/* POST settings */
router.post('/', (req, res, next) => {send_query(req, res, next, "POST", null, null);});

/* PUT settings by ID, Profile_ID */
router.put('/ID/:ID', (req, res, next) => {send_query(req, res, next, "PUT", "ID", req.params.ID);});
router.put('/Profile_ID/:Profile_ID', (req, res, next) => {send_query(req, res, next, "PUT", "Profile_ID", req.params.Profile_ID);});

/* DELETE settings by ID, Profile_ID */
router.delete('/ID/:ID', (req, res, next) => {send_query(req, res, next, "DELETE", "ID", req.params.ID);});
router.delete('/Profile_ID/:Profile_ID', (req, res, next) => {send_query(req, res, next, "DELETE", "Profile_ID", req.params.Profile_ID);});

//Polymorphic function for sending queries to database.
async function send_query(req, res, next, type, key, params){
    try{
        switch(type){
            case "GET":
                if(key == null){
                    res.json(await settings_service.getAll(req.query.page));
                }
                else{
                    res.json(await settings_service.getOne(key, params));
                }
                break;
            case "POST":
                res.json(await settings_service.create(req.body));
                break;
            case "PUT":
                res.json(await settings_service.update(key, params, req.body));
                break;
            case "DELETE":
                res.json(await settings_service.remove(key, params));
                break;
        }
    }
    catch(err){
        console.error(`Error with ${type} query for ${key} key: `, err.message);
        next(err);
    }
}

module.exports = router;