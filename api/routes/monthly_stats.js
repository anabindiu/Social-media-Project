const express = require("express");
const router = express.Router();
const monthly_stats_service = require("../services/monthly_stats");

/* GET monthly_stats by ALL, Feature_Stats_ID, Month_Year */
router.get('/', (req, res, next) => {send_query(req, res, next, "GET", null, null);});
router.get('/Feature_Stats_ID/:Feature_Stats_ID', (req, res, next) => {send_query(req, res, next, "GET", "Feature_Stats_ID", null, req.params.Feature_Stats_ID, null);});
router.get('/Month_Year/:Month_Year', (req, res, next) => {send_query(req, res, next, "GET", "Month_Year", null, req.params.Month_Year, null);});
router.get('/Feature_Stats_ID/:Feature_Stats_ID/Month_Year/:Month_Year', (req, res, next) => {send_query(req, res, next, "GET", "Feature_Stats_ID", "Month_Year", req.params.Feature_Stats_ID, req.params.Month_Year);});

/* POST monthly_stats */
router.post('/', (req, res, next) => {send_query(req, res, next, "POST", null, null);});

/* PUT monthly_stats by Feature_Stats_ID, Month_Year */
router.put('/Feature_Stats_ID/:Feature_Stats_ID/Month_Year/:Month_Year', (req, res, next) => {send_query(req, res, next, "PUT", "Feature_Stats_ID", "Month_Year", req.params.Feature_Stats_ID, req.params.Month_Year);});

/* DELETE monthly_stats by Feature_Stats_ID, Month_Year */
router.delete('/Feature_Stats_ID/:Feature_Stats_ID/Month_Year/:Month_Year', (req, res, next) => {send_query(req, res, next, "DELETE", "Feature_Stats_ID", "Month_Year", req.params.Feature_Stats_ID, req.params.Month_Year);});

//Polymorphic function for sending queries to database.
async function send_query(req, res, next, type, key1, key2, params1, params2){
    try{
        switch(type){
            case "GET":
                if(key1 == null && key2 == null){
                    res.json(await monthly_stats_service.getAll(req.query.page));
                }
                else{
                    res.json(await monthly_stats_service.getOne(key1, key2, params1, params2));
                }
                break;
            case "POST":
                res.json(await monthly_stats_service.create(req.body));
                break;
            case "PUT":
                res.json(await monthly_stats_service.update(key1, key2, params1, params2, req.body));
                break;
            case "DELETE":
                res.json(await monthly_stats_service.remove(key1, key2, params1, params2));
                break;
        }
    }
    catch(err){
        console.error(`Error with ${type} query for ${key1} & ${key2} key: `, err.message);
        next(err);
    }
}

module.exports = router;