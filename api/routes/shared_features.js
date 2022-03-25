const express = require("express");
const router = express.Router();
const shared_features_service = require("../services/shared_features");

/* GET shared_features by ALL, Profile_ID_Author, Profile_ID_Recipient, Feature_ID, Feature_type*/
router.get('/', (req, res, next) => {send_query(req, res, next, "GET", null, null);});
router.get('/Profile_ID_Author/:Profile_ID_Author', (req, res, next) => {send_query(req, res, next, "GET", "Profile_ID_Author", null, req.params.Profile_ID_Author, null);});
router.get('/Profile_ID_Recipient/:Profile_ID_Recipient', (req, res, next) => {send_query(req, res, next, "GET", "Profile_ID_Recipient", null, req.params.Profile_ID_Recipient, null);});
router.get('/Feature_ID/:Feature_ID', (req, res, next) => {send_query(req, res, next, "GET", "Feature_ID", null, req.params.Feature_ID, null);});
router.get('/Profile_ID_Author/:Profile_ID_Author/Profile_ID_Recipient/:Profile_ID_Recipient', (req, res, next) => {send_query(req, res, next, "GET", "Profile_ID_Author", "Profile_ID_Recipient", req.params.Profile_ID_Author, req.params.Profile_ID_Recipient);});
router.get('/Profile_ID_Author/:Profile_ID_Author/Feature_ID/:Feature_ID', (req, res, next) => {send_query(req, res, next, "GET", "Profile_ID_Author", "Feature_ID", req.params.Profile_ID_Author, req.params.Feature_ID);});
router.get('/Profile_ID_Author/:Profile_ID_Author/Feature_type/:Feature_type', (req, res, next) => {send_query(req, res, next, "GET", "Profile_ID_Author", "Feature_type", req.params.Profile_ID_Author, req.params.Feature_type);});
router.get('/Profile_ID_Recipient/:Profile_ID_Recipient/Feature_ID/:Feature_ID', (req, res, next) => {send_query(req, res, next, "GET", "Profile_ID_Recipient", "Feature_ID", req.params.Profile_ID_Author, req.params.Feature_ID);});
router.get('/Profile_ID_Recipient/:Profile_ID_Recipient/Feature_type/:Feature_type', (req, res, next) => {send_query(req, res, next, "GET", "Profile_ID_Recipient", "Feature_type", req.params.Profile_ID_Author, req.params.Feature_type);});

/* POST shared_features */
router.post('/', (req, res, next) => {send_query(req, res, next, "POST", null, null);});

/* PUT shared_features by Profile_ID_Author, Profile_ID_Recipient */
router.put('/Profile_ID_Author/:Profile_ID_Author/Profile_ID_Recipient/:Profile_ID_Recipient', (req, res, next) => {send_query(req, res, next, "PUT", "Profile_ID_Author", "Profile_ID_Recipient", req.params.Profile_ID_Author, req.params.Profile_ID_Recipient);});

/* DELETE shared_features by Profile_ID_Author, Profile_ID_Recipient */
router.delete('/Profile_ID_Author/:Profile_ID_Author/Profile_ID_Recipient/:Profile_ID_Recipient', (req, res, next) => {send_query(req, res, next, "DELETE", "Profile_ID_Author", "Profile_ID_Recipient", req.params.Profile_ID_Author, req.params.Profile_ID_Recipient);});

//Polymorphic function for sending queries to database.
async function send_query(req, res, next, type, key1, key2, params1, params2){
    try{
        switch(type){
            case "GET":
                if(key == null){
                    res.json(await shared_features_service.getAll(req.query.page));
                }
                else{
                    res.json(await shared_features_service.getOne(key1, key2, params1, params2));
                }
                break;
            case "POST":
                res.json(await shared_features_service.create(req.body));
                break;
            case "PUT":
                res.json(await shared_features_service.update(key1, key2, params1, params2, req.body));
                break;
            case "DELETE":
                res.json(await shared_features_service.remove(key1, key2, params1, params2));
                break;
        }
    }
    catch(err){
        console.error(`Error with ${type} query for ${key} key: `, err.message);
        next(err);
    }
}

module.exports = router;