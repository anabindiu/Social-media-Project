const express = require("express");
const router = express.Router();
const notes_service = require("../services/notes");

/* GET notes by ALL, ID */
router.get('/', (req, res, next) => {send_query(req, res, next, "GET", null, null);});
router.get('/ID/:ID', (req, res, next) => {send_query(req, res, next, "GET", "ID", req.params.ID);});

/* POST notes */
router.post('/', (req, res, next) => {send_query(req, res, next, "POST", null, null);});

/* PUT notes by ID */
router.put('/ID/:ID', (req, res, next) => {send_query(req, res, next, "PUT", "ID", req.params.ID);});

/* DELETE notes by ID */
router.delete('/ID/:ID', (req, res, next) => {send_query(req, res, next, "DELETE", "ID", req.params.ID);});

//Polymorphic function for sending queries to database.
async function send_query(req, res, next, type, key, params){
    try{
        switch(type){
            case "GET":
                if(key == null){
                    res.json(await notes_service.getAll(req.query.page));
                }
                else{
                    res.json(await notes_service.getOne(key, params));
                }
                break;
            case "POST":
                res.json(await notes_service.create(req.body));
                break;
            case "PUT":
                res.json(await notes_service.update(key, params, req.body));
                break;
            case "DELETE":
                res.json(await notes_service.remove(key, params));
                break;
        }
    }
    catch(err){
        console.error(`Error with ${type} query for ${key} key: `, err.message);
        next(err);
    }
}

module.exports = router;