const express = require("express");
const router = express.Router();
const monthly_stats_service = require("../services/monthly_stats");

/* GET monthly_stats by ALL, ProfileID, Month_Year */
router.get('/', (req, res, next) => {send_query(req, res, next, "GET", null, null, null);});
router.get('/ProfileID/:ProfileID', (req, res, next) => {send_query(req, res, next, "GET", "ProfileID", null, null, req.params.ProfileID, null, null);});
router.get('/ProfileID/:ProfileID/Year/:Year/Month/:Month', (req, res, next) => {send_query(req, res, next, "GET", "ProfileID", "Year", "Month", req.params.ProfileID, req.params.Year, req.params.Month);});
router.get('/ProfileID/:ProfileID/Year/:Year', (req, res, next) => {send_query(req, res, next, "GET", "ProfileID", "Year", null, req.params.ProfileID, req.params.Year, null);});

/* POST monthly_stats */
router.post('/', (req, res, next) => {send_query(req, res, next, "POST", null, null, null);});

/* PUT monthly_stats by ProfileID, Month_Year */
router.put('/ProfileID/:ProfileID/Year/:Year/Month/:Month', (req, res, next) => {send_query(req, res, next, "PUT", "ProfileID", "Year", "Month", req.params.ProfileID, req.params.Year, req.params.Month);});

/* DELETE monthly_stats by ProfileID, Month_Year */
router.delete('/ProfileID/:ProfileID/Year/:Year/Month/:Month', (req, res, next) => {send_query(req, res, next, "DELETE", "ProfileID", "Year", "Month", req.params.ProfileID, req.params.Year, req.params.Month);});

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