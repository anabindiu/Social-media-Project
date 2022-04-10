const express = require("express");
const router = express.Router();
const tasks_service = require("../services/tasks");

/* GET tasks by ALL, ID, Header */
router.get('/', (req, res, next) => {send_query(req, res, next, "GET", null, null);});
router.get('/ID/:ID', (req, res, next) => {send_query(req, res, next, "GET", "ID", req.params.ID);});
router.get('/Header/:Header', (req, res, next) => {send_query(req, res, next, "GET", "Header", req.params.Header);});

/* POST tasks */
router.post('/', (req, res, next) => {send_query(req, res, next, "POST", null, null);});

/* PUT tasks by ID, Header */
router.put('/ID/:ID', (req, res, next) => {send_query(req, res, next, "PUT", "ID", req.params.ID);});
router.put('/Header/:Header', (req, res, next) => {send_query(req, res, next, "PUT", "Header", req.params.Header);});

/* DELETE tasks by ID, Header */
router.delete('/ID/:ID', (req, res, next) => {send_query(req, res, next, "DELETE", "ID", req.params.ID);});
router.delete('/Header/:Header', (req, res, next) => {send_query(req, res, next, "DELETE", "Header", req.params.Header);});

//Polymorphic function for sending queries to database.
async function send_query(req, res, next, type, key, params){
    try{
        switch(type){
            case "GET":
                if(key == null){
                    res.json(await tasks_service.getAll(req.query.page));
                }
                else{
                    res.json(await tasks_service.getOne(key, params));
                }
                break;
            case "POST":
                res.json(await tasks_service.create(req.body));
                break;
            case "PUT":
                res.json(await tasks_service.update(key, params, req.body));
                break;
            case "DELETE":
                res.json(await tasks_service.remove(key, params));
                break;
        }
    }
    catch(err){
        console.error(`Error with ${type} query for ${key} key: `, err.message);
        next(err);
    }
}

module.exports = router;