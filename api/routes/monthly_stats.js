const express = require("express");
const router = express.Router();
const monthly_stats_service = require("../services/monthly_stats");

/* GET monthly_stats by ALL, Profile_ID, Month_Year */
router.get('/', (req, res, next) => {send_query(req, res, next, "GET", null, null, null);});
router.get('/Profile_ID/:Profile_ID', (req, res, next) => {send_query(req, res, next, "GET", "Profile_ID", null, null, req.params.Profile_ID, null, null);});
router.get('/Profile_ID/:Profile_ID/Year/:Year/Month/:Month', (req, res, next) => {send_query(req, res, next, "GET", "Profile_ID", "Year", "Month", req.params.Profile_ID, req.params.Year, req.params.Month);});
router.get('/Profile_ID/:Profile_ID/Year/:Year', (req, res, next) => {send_query(req, res, next, "GET", "Profile_ID", "Year", null, req.params.Profile_ID, req.params.Year, null);});

/* POST monthly_stats */
router.post('/', (req, res, next) => {send_query(req, res, next, "POST", null, null, null);});

/* PUT monthly_stats by Profile_ID, Month_Year */
router.put('/Profile_ID/:Profile_ID/Year/:Year/Month/:Month', (req, res, next) => {send_query(req, res, next, "PUT", "Profile_ID", "Year", "Month", req.params.Profile_ID, req.params.Year, req.params.Month);});

/* DELETE monthly_stats by Profile_ID, Month_Year */
router.delete('/Profile_ID/:Profile_ID/Year/:Year/Month/:Month', (req, res, next) => {send_query(req, res, next, "DELETE", "Profile_ID", "Year", "Month", req.params.Profile_ID, req.params.Year, req.params.Month);});

//Polymorphic function for sending queries to database.
async function send_query(req, res, next, type, key1, key2, key3, params1, params2, params3){
    try{
        switch(type){
            case "GET":
                if(key1 == null && key2 == null){
                    res.json(await monthly_stats_service.getAll(req.query.page));
                }
                else{
                    res.json(await monthly_stats_service.getOne(key1, key2, key3, params1, params2, params3));
                }
                break;
            case "POST":
                console.log(req.body);
                res.json(await monthly_stats_service.create(req.body));
                break;
            case "PUT":
                res.json(await monthly_stats_service.update(key1, key2, key3, params1, params2, params3, req.body));
                break;
            case "DELETE":
                res.json(await monthly_stats_service.remove(key1, key2, key3, params1, params2, params3));
                break;
        }
    }
    catch(err){
        console.error(`Error with ${type} query for ${key1} & ${key2} key: `, err.message);
        next(err);
    }
}

module.exports = router;