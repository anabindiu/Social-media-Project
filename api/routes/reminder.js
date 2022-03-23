const express = require('express');
const router = express.Router();
const reminder = require('../services/reminder');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await reminder.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting reminder `, err.message);
    next(err);
  }
});

/* POST programming language */
router.post('/', async function(req, res, next) {
  try {
    res.json(await reminder.create(req.body));
  } catch (err) {
    console.error(`Error while creating reminder`, err.message);
    next(err);
  }
});

/* PUT programming language */
router.put('/:Reminder_ID', async function(req, res, next) {
  try {
    res.json(await reminder.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating reminder`, err.message);
    next(err);
  }
});

/* DELETE programming language */
router.delete('/:Reminder_ID', async function(req, res, next) {
  try {
    res.json(await reminder.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting reminder`, err.message);
    next(err);
  }
});

module.exports = router;
