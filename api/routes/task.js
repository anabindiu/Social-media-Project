const express = require('express');
const router = express.Router();
const task = require('../services/task');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await task.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting task `, err.message);
    next(err);
  }
});

/* POST programming language */
router.post('/', async function(req, res, next) {
  try {
    res.json(await task.create(req.body));
  } catch (err) {
    console.error(`Error while creating task`, err.message);
    next(err);
  }
});

/* PUT programming language */
router.put('/:profile_Email', async function(req, res, next) {
  try {
    res.json(await task.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating task`, err.message);
    next(err);
  }
});

/* DELETE programming language */
router.delete('/:profile_Email', async function(req, res, next) {
  try {
    res.json(await task.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting task`, err.message);
    next(err);
  }
});

module.exports = router;
