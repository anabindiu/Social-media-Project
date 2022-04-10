const express = require("express");
const router = express.Router();
const features_service = require("../services/features");

/* GET features by ALL, Profile_ID, Profile_Email, Profile_Username */
router.get('/', (req, res, next) => {send_query(req, res, next, "GET", null, null);});
router.get('/Profile_ID/:Profile_ID', (req, res, next) => {send_query(req, res, next, "GET", "Profile_ID", req.params.Profile_ID);});
router.get('/Profile_Email/:Profile_Email', (req, res, next) => {send_query(req, res, next, "GET", "Profile_Email", req.params.Profile_Email);});
router.get('/Profile_Username/:Profile_Username', (req, res, next) => {send_query(req, res, next, "GET", "Profile_Username", req.params.Profile_Username);});

/* POST features */
router.post('/', (req, res, next) => {send_query(req, res, next, "POST", null, null);});

/* PUT features by Profile_ID, Profile_Email, Profile_Username */
router.put('/Profile_ID/:Profile_ID', (req, res, next) => {send_query(req, res, next, "PUT", "Profile_ID", req.params.Profile_ID);});
router.put('/Profile_Email/:Profile_Email', (req, res, next) => {send_query(req, res, next, "PUT", "Profile_Email", req.params.Profile_Email);});
router.put('/Profile_Username/:Profile_Username', (req, res, next) => {send_query(req, res, next, "PUT", "Profile_Username", req.params.Profile_Username);});

/* DELETE features by Profile_ID, Profile_Email, Profile_Username*/
router.delete('/Profile_ID/:Profile_ID', (req, res, next) => {send_query(req, res, next, "DELETE", "Profile_ID", req.params.Profile_ID);});
router.delete('/Profile_Email/:Profile_Email', (req, res, next) => {send_query(req, res, next, "DELETE", "Profile_Email", req.params.Profile_Email);});
router.delete('/Profile_Username/:Profile_Username', (req, res, next) => {send_query(req, res, next, "DELETE", "Profile_Username", req.params.Profile_Username);});

//Polymorphic function for sending queries to database.
async function send_query(req, res, next, type, key, params){
    try{
        switch(type){
            case "GET":
                if(key == null){
                    res.json(await features_service.getAll(req.query.page));
                }
                else{
                    res.json(await features_service.getOne(key, params));
                }
                break;
            case "POST":
                res.json(await features_service.create(req.body));
                break;
            case "PUT":
                res.json(await features_service.update(key, params, req.body));
                break;
            case "DELETE":
                res.json(await features_service.remove(key, params));
                break;
        }
    }
    catch(err){
        console.error(`Error with ${type} query for ${key} key: `, err.message);
        next(err);
    }
}

module.exports = router;