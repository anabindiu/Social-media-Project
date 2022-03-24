const express = require('express');
const router = express.Router();
const administrator = require('../services/administrator');

/* GET administrator */
router.get('/', async function(req, res, next) {
    try {
        res.json(await administrator.getMultiple(req.query.page));
    } 
    catch (err) {
        console.error(`Error while getting administrator `, err.message);
        next(err);
    }
});

/* POST administrator */
router.post('/', async function(req, res, next) {
    try {
        res.json(await administrator.create(req.body));
    }
    catch (err) {
        console.error(`Error while creating administrator`, err.message);
        next(err);
    }
});

/* PUT administrator */
router.put('/:Email', async function(req, res, next) {
    try {
        res.json(await administrator.update(req.params.id, req.body));
    }
    catch (err) {
        console.error(`Error while updating administrator`, err.message);
        next(err);
    }
});

/* DELETE administrator */
router.delete('/:Email', async function(req, res, next) {
    try {
        res.json(await administrator.remove(req.params.id));
    }
    catch (err) {
        console.error(`Error while deleting administrator`, err.message);
        next(err);
    }
});

module.exports = router;