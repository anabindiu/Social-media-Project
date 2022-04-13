const express = require("express");
const router = express.Router();
const yearly_service = require("../services/yearly");

/* GET yearly by ALL, Feature_Stats_ID, Year */
router.get('/', (req, res, next) => {send_query(req, res, next, "GET", null, null);});
router.get('/Feature_Stats_ID/:Feature_Stats_ID', (req, res, next) => {send_query(req, res, next, "GET", "Feature_Stats_ID", null, req.params.Feature_Stats_ID, null);});
router.get('/Year/:Year', (req, res, next) => {send_query(req, res, next, "GET", "Year", null, req.params.Year, null);});
router.get('/Feature_Stats_ID/:Feature_Stats_ID/Year/:Year', (req, res, next) => {send_query(req, res, next, "GET", "Feature_Stats_ID", "Year", req.params.Feature_Stats_ID, req.params.Year);});

/* POST yearly */
router.post('/', (req, res, next) => {send_query(req, res, next, "POST", null, null);});

/* PUT yearly by Feature_Stats_ID, Year */
router.put('/Feature_Stats_ID/:Feature_Stats_ID/Year/:Year', (req, res, next) => {send_query(req, res, next, "PUT", "Feature_Stats_ID", "Year", req.params.Feature_Stats_ID, req.params.Year);});

/* DELETE yearly by Feature_Stats_ID, Year */
router.delete('/Feature_Stats_ID/:Feature_Stats_ID/Year/:Year', (req, res, next) => {send_query(req, res, next, "DELETE", "Feature_Stats_ID", "Year", req.params.Feature_Stats_ID, req.params.Year);});

//Polymorphic function for sending queries to database.
async function send_query(req, res, next, type, key1, key2, params1, params2){
    try{
        switch(type){
            case "GET":
                if(key1 == null && key2 == null){
                    res.json(await yearly_service.getAll(req.query.page));
                }
                else{
                    res.json(await yearly_service.getOne(key1, key2, params1, params2));
                }
                break;
            case "POST":
                res.json(await yearly_service.create(req.body));
                break;
            case "PUT":
                res.json(await yearly_service.update(key1, key2, params1, params2, req.body));
                break;
            case "DELETE":
                res.json(await yearly_service.remove(key1, key2, params1, params2));
                break;
        }
    }
    catch(err){
        console.error(`Error with ${type} query for ${key1} & ${key2} key: `, err.message);
        next(err);
    }
}

module.exports = router;