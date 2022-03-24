const express = require("express");
const router = express.Router();
const has_friend_service = require("../services/has_friend");

/* GET has_friend by ALL, ID_1, ID_2 */
router.get('/', (req, res, next) => {send_query(req, res, next, "GET", null, null);});
router.get('/ID_1/:ID_1', (req, res, next) => {send_query(req, res, next, "GET", "ID_1", null, req.params.ID_1, null);});
router.get('/ID_2/:ID_2', (req, res, next) => {send_query(req, res, next, "GET", "ID_2", null, req.params.ID_2, null);});
router.get('/ID_1/:ID_1/ID_2/:ID_2', (req, res, next) => {send_query(req, res, next, "GET", "ID_1", "ID_2", req.params.ID_1, req.params.ID_2);});

/* POST has_friend */
router.post('/', (req, res, next) => {send_query(req, res, next, "POST", null, null);});

/* PUT has_friend by ID_1, ID_2 */
router.put('/ID_1/:ID_1/ID_2/:ID_2', (req, res, next) => {send_query(req, res, next, "PUT", "ID_1", "ID_2", req.params.ID_1, req.params.ID_2);});

/* DELETE has_friend by ID_1, ID_2 */
router.delete('/ID_1/:ID_1/ID_2/:ID_2', (req, res, next) => {send_query(req, res, next, "DELETE", "ID_1", "ID_2", req.params.ID_1, req.params.ID_2);});

//Polymorphic function for sending queries to database.
async function send_query(req, res, next, type, key1, key2, params1, params2){
    try{
        switch(type){
            case "GET":
                if(key == null){
                    res.json(await has_friend_service.getAll(req.query.page));
                }
                else{
                    res.json(await has_friend_service.getOne(key1, key2, params1, params2));
                }
                break;
            case "POST":
                res.json(await has_friend_service.create(req.body));
                break;
            case "PUT":
                res.json(await has_friend_service.update(key1, key2, params1, params2, req.body));
                break;
            case "DELETE":
                res.json(await has_friend_service.remove(key1, key2, params1, params2));
                break;
        }
    }
    catch(err){
        console.error(`Error with ${type} query for ${key} key: `, err.message);
        next(err);
    }
}

module.exports = router;