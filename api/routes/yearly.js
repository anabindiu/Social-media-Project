const express = require('express');
const router = express.Router();
const yearly = require('../services/yearly');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await yearly.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting yearly `, err.message);
    next(err);
  }
});

/* POST programming language */
router.post('/', async function(req, res, next) {
  try {
    res.json(await yearly.create(req.body));
  } catch (err) {
    console.error(`Error while creating yearly`, err.message);
    next(err);
  }
});

/* PUT programming language */
router.put('/:profile_Email', async function(req, res, next) {
  try {
    res.json(await yearly.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating yearly`, err.message);
    next(err);
  }
});

/* DELETE programming language */
router.delete('/:profile_Email', async function(req, res, next) {
  try {
    res.json(await yearly.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting yearly`, err.message);
    next(err);
  }
});

module.exports = router;
