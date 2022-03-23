const express = require('express');
const router = express.Router();
const task_list = require('../services/task_list');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await task_list.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting task_list `, err.message);
    next(err);
  }
});

/* POST programming language */
router.post('/', async function(req, res, next) {
  try {
    res.json(await task_list.create(req.body));
  } catch (err) {
    console.error(`Error while creating task_list`, err.message);
    next(err);
  }
});

/* PUT programming language */
router.put('/:profile_Email', async function(req, res, next) {
  try {
    res.json(await task_list.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating task_list`, err.message);
    next(err);
  }
});

/* DELETE programming language */
router.delete('/:profile_Email', async function(req, res, next) {
  try {
    res.json(await task_list.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting task_list`, err.message);
    next(err);
  }
});

module.exports = router;
