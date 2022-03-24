const express = require("express");
const router = express.Router();
const note_service = require("../services/note");

/* GET note by ALL, ID, Notes_ID */
router.get('/', (req, res, next) => {send_query(req, res, next, "GET", null, null);});
router.get('/ID/:ID', (req, res, next) => {send_query(req, res, next, "GET", "ID", null, req.params.ID, null);});
router.get('/Notes_ID/:Notes_ID', (req, res, next) => {send_query(req, res, next, "GET", "Notes_ID", null, req.params.Notes_ID, null);});
router.get('/ID/:ID/Notes_ID/:Notes_ID', (req, res, next) => {send_query(req, res, next, "GET", "ID", "Notes_ID", req.params.ID, req.params.Notes_ID);});

/* POST note */
router.post('/', (req, res, next) => {send_query(req, res, next, "POST", null, null);});

/* PUT note by ID, Notes_ID */
router.put('/ID/:ID/Notes_ID/:Notes_ID', (req, res, next) => {send_query(req, res, next, "PUT", "ID", "Notes_ID", req.params.ID, req.params.Notes_ID);});

/* DELETE note by ID, Notes_ID */
router.delete('/ID/:ID/Notes_ID/:Notes_ID', (req, res, next) => {send_query(req, res, next, "DELETE", "ID", "Notes_ID", req.params.ID, req.params.Notes_ID);});

//Polymorphic function for sending queries to database.
async function send_query(req, res, next, type, key1, key2, params1, params2){
    try{
        switch(type){
            case "GET":
                if(key == null){
                    res.json(await note_service.getAll(req.query.page));
                }
                else{
                    res.json(await note_service.getOne(key1, key2, params1, params2));
                }
                break;
            case "POST":
                res.json(await note_service.create(req.body));
                break;
            case "PUT":
                res.json(await note_service.update(key1, key2, params1, params2, req.body));
                break;
            case "DELETE":
                res.json(await note_service.remove(key1, key2, params1, params2));
                break;
        }
    }
    catch(err){
        console.error(`Error with ${type} query for ${key} key: `, err.message);
        next(err);
    }
}

module.exports = router;