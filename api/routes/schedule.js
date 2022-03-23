const express = require('express');
const router = express.Router();
const schedule = require('../services/schedule');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await schedule.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting schedule `, err.message);
    next(err);
  }
});

/* POST programming language */
router.post('/', async function(req, res, next) {
  try {
    res.json(await schedule.create(req.body));
  } catch (err) {
    console.error(`Error while creating schedule`, err.message);
    next(err);
  }
});

/* PUT programming language */
router.put('/:profile_Email', async function(req, res, next) {
  try {
    res.json(await schedule.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating schedule`, err.message);
    next(err);
  }
});

/* DELETE programming language */
router.delete('/:profile_Email', async function(req, res, next) {
  try {
    res.json(await schedule.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting schedule`, err.message);
    next(err);
  }
});

module.exports = router;
