const express = require("express");
const router = express.Router();
const administrator_service = require("../services/administrator");

/* GET administrator by ALL, ID, Email, Username*/http://localhost:${port}
router.get('/', (req, res, next) => {send_query(req, res, next, "GET", null, null);});
router.get('/ID/:ID', (req, res, next) => {send_query(req, res, next, "GET", "ID", req.params.ID);});
router.get('/Email/:Email', (req, res, next) => {send_query(req, res, next, "GET", "Email", req.params.Email);});

/* POST administrator */
router.post('/', (req, res, next) => {send_query(req, res, next, "POST", null, null);});

/* PUT administrator by ID, Email, Username */
router.put('/ID/:ID', (req, res, next) => {send_query(req, res, next, "PUT", "ID", req.params.ID);});
router.put('/Email/:Email', (req, res, next) => {send_query(req, res, next, "PUT", "Email", req.params.Email);});

/* DELETE administrator by ID, Email, Username*/
router.delete('/ID/:ID', (req, res, next) => {send_query(req, res, next, "DELETE", "ID", req.params.ID);});
router.delete('/Email/:Email', (req, res, next) => {send_query(req, res, next, "DELETE", "Email", req.params.Email);});

//Polymorphic function for sending queries to database.
async function send_query(req, res, next, type, key, params){
    try{
        switch(type){
            case "GET":
                if(key == null){
                    res.json(await administrator_service.getAll(req.query.page));
                }
                else{
                    res.json(await administrator_service.getOne(key, params));
                }
                break;
            case "POST":
                res.json(await administrator_service.create(req.body));
                break;
            case "PUT":
                res.json(await administrator_service.update(key, params, req.body));
                break;
            case "DELETE":
                res.json(await administrator_service.remove(key, params));
                break;
        }
    }
    catch(err){
        console.error(`Error with ${type} query for ${key} key: `, err.message);
        next(err);
    }
}

module.exports = router;