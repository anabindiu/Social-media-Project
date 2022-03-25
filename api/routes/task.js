const express = require("express");
const router = express.Router();
const task_service = require("../services/task");

/* GET task by ALL, ID, Tasks_ID */
router.get('/', (req, res, next) => {send_query(req, res, next, "GET", null, null);});
router.get('/ID/:ID', (req, res, next) => {send_query(req, res, next, "GET", "ID", null, req.params.ID, null);});
router.get('/Tasks_ID/:Tasks_ID', (req, res, next) => {send_query(req, res, next, "GET", "Tasks_ID", null, req.params.Tasks_ID, null);});
router.get('/ID/:ID/Tasks_ID/:Tasks_ID', (req, res, next) => {send_query(req, res, next, "GET", "ID", "Tasks_ID", req.params.ID, req.params.Tasks_ID);});

/* POST task */
router.post('/', (req, res, next) => {send_query(req, res, next, "POST", null, null);});

/* PUT task by ID, Tasks_ID */
router.put('/ID/:ID/Tasks_ID/:Tasks_ID', (req, res, next) => {send_query(req, res, next, "PUT", "ID", "Tasks_ID", req.params.ID, req.params.Tasks_ID);});

/* DELETE task by ID, Tasks_ID */
router.delete('/ID/:ID/Tasks_ID/:Tasks_ID', (req, res, next) => {send_query(req, res, next, "DELETE", "ID", "Tasks_ID", req.params.ID, req.params.Tasks_ID);});

//Polymorphic function for sending queries to database.
async function send_query(req, res, next, type, key1, key2, params1, params2){
    try{
        switch(type){
            case "GET":
                if(key == null){
                    res.json(await task_service.getAll(req.query.page));
                }
                else{
                    res.json(await task_service.getOne(key1, key2, params1, params2));
                }
                break;
            case "POST":
                res.json(await task_service.create(req.body));
                break;
            case "PUT":
                res.json(await task_service.update(key1, key2, params1, params2, req.body));
                break;
            case "DELETE":
                res.json(await task_service.remove(key1, key2, params1, params2));
                break;
        }
    }
    catch(err){
        console.error(`Error with ${type} query for ${key} key: `, err.message);
        next(err);
    }
}

module.exports = router;