const express = require("express");
const router = express.Router();
const schedule_service = require("../services/schedule");

/* GET schedule by ALL, ID, Calendar_Name */
router.get('/', (req, res, next) => {send_query(req, res, next, "GET", null, null);});
router.get('/ID/:ID', (req, res, next) => {send_query(req, res, next, "GET", "ID", req.params.ID);});
router.get('/Calendar_Name/:Calendar_Name', (req, res, next) => {send_query(req, res, next, "GET", "Calendar_Name", req.params.Calendar_Name);});

/* POST schedule */
router.post('/', (req, res, next) => {send_query(req, res, next, "POST", null, null);});

/* PUT schedule by ID, Calendar_Name */
router.put('/ID/:ID', (req, res, next) => {send_query(req, res, next, "PUT", "ID", req.params.ID);});
router.put('/Calendar_Name/:Calendar_Name', (req, res, next) => {send_query(req, res, next, "PUT", "Calendar_Name", req.params.Calendar_Name);});

/* DELETE schedule by ID, Calendar_Name */
router.delete('/ID/:ID', (req, res, next) => {send_query(req, res, next, "DELETE", "ID", req.params.ID);});
router.delete('/Calendar_Name/:Calendar_Name', (req, res, next) => {send_query(req, res, next, "DELETE", "Calendar_Name", req.params.Calendar_Name);});

//Polymorphic function for sending queries to database.
async function send_query(req, res, next, type, key, params){
    try{
        switch(type){
            case "GET":
                if(key == null){
                    res.json(await schedule_service.getAll(req.query.page));
                }
                else{
                    res.json(await schedule_service.getOne(key, params));
                }
                break;
            case "POST":
                res.json(await schedule_service.create(req.body));
                break;
            case "PUT":
                res.json(await schedule_service.update(key, params, req.body));
                break;
            case "DELETE":
                res.json(await schedule_service.remove(key, params));
                break;
        }
    }
    catch(err){
        console.error(`Error with ${type} query for ${key} key: `, err.message);
        next(err);
    }
}

module.exports = router;