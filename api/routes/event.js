const express = require('express');
const router = express.Router();
const event = require('../services/event');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await event.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting event `, err.message);
    next(err);
  }
});

/* POST programming language */
router.post('/', async function(req, res, next) {
  try {
    res.json(await event.create(req.body));
  } catch (err) {
    console.error(`Error while creating event`, err.message);
    next(err);
  }
});

/* PUT programming language */
router.put('/:Event_ID', async function(req, res, next) {
  try {
    res.json(await event.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating event`, err.message);
    next(err);
  }
});

/* DELETE programming language */
router.delete('/:Event_ID', async function(req, res, next) {
  try {
    res.json(await event.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting event`, err.message);
    next(err);
  }
});

module.exports = router;
