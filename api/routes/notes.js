const express = require('express');
const router = express.Router();
const notes = require('../services/notes');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await notes.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting notes `, err.message);
    next(err);
  }
});

/* POST programming language */
router.post('/', async function(req, res, next) {
  try {
    res.json(await notes.create(req.body));
  } catch (err) {
    console.error(`Error while creating notes`, err.message);
    next(err);
  }
});

/* PUT programming language */
router.put('/:profile_Email', async function(req, res, next) {
  try {
    res.json(await notes.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating notes`, err.message);
    next(err);
  }
});

/* DELETE programming language */
router.delete('/:profile_Email', async function(req, res, next) {
  try {
    res.json(await notes.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting notes`, err.message);
    next(err);
  }
});

module.exports = router;
