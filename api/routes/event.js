const express = require("express");
const router = express.Router();
const event_service = require("../services/event");

/* GET event by ALL, ID, Schedule_ID */
router.get('/', (req, res, next) => {send_query(req, res, next, "GET", null, null);});
router.get('/ID/:ID', (req, res, next) => {send_query(req, res, next, "GET", "ID", req.params.ID);});
router.get('/Schedule_ID/:Schedule_ID', (req, res, next) => {send_query(req, res, next, "GET", "Schedule_ID", req.params.Schedule_ID);});

/* POST event */
router.post('/', (req, res, next) => {send_query(req, res, next, "POST", null, null);});

/* PUT event by ID, Schedule_ID */
router.put('/ID/:ID', (req, res, next) => {send_query(req, res, next, "PUT", "ID", req.params.ID);});
router.put('/Schedule_ID/:Schedule_ID', (req, res, next) => {send_query(req, res, next, "PUT", "Schedule_ID", req.params.Schedule_ID);});

/* DELETE event by ID, Schedule_ID */
router.delete('/ID/:ID', (req, res, next) => {send_query(req, res, next, "DELETE", "ID", req.params.ID);});
router.delete('/Schedule_ID/:Schedule_ID', (req, res, next) => {send_query(req, res, next, "DELETE", "Schedule_ID", req.params.Schedule_ID);});

//Polymorphic function for sending queries to database.
async function send_query(req, res, next, type, key, params){
    try{
        switch(type){
            case "GET":
                if(key == null){
                    res.json(await event_service.getAll(req.query.page));
                }
                else{
                    res.json(await event_service.getOne(key, params));
                }
                break;
            case "POST":
                res.json(await event_service.create(req.body));
                break;
            case "PUT":
                res.json(await event_service.update(key, params, req.body));
                break;
            case "DELETE":
                res.json(await event_service.remove(key, params));
                break;
        }
    }
    catch(err){
        console.error(`Error with ${type} query for ${key} key: `, err.message);
        next(err);
    }
}

module.exports = router;