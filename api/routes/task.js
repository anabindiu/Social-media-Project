const express = require('express');
const router = express.Router();
const profiles = require('../services/profiles');

/* GET profile */
router.get('/', async function(req, res, next) {
    try {
        res.json(await profiles.getMultiple(req.query.page));
    } 
    catch (err) {
        console.error(`Error while getting profiles `, err.message);
        next(err);
    }
});

/* POST profile */
router.post('/', async function(req, res, next) {
    try {
        res.json(await profiles.create(req.body));
    }
    catch (err) {
        console.error(`Error while creating profile`, err.message);
        next(err);
    }
});

/* PUT profile */
router.put('/:Email', async function(req, res, next) {
    try {
        res.json(await profiles.update(req.params.id, req.body));
    }
    catch (err) {
        console.error(`Error while updating profile`, err.message);
        next(err);
    }
});

/* DELETE profile */
router.delete('/:Email', async function(req, res, next) {
    try {
        res.json(await profiles.remove(req.params.id));
    }
    catch (err) {
        console.error(`Error while deleting profile`, err.message);
        next(err);
    }
});

module.exports = router;