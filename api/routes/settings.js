const express = require('express');
const router = express.Router();
const settings = require('../services/settings');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await settings.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting settings `, err.message);
    next(err);
  }
});

/* POST programming language */
router.post('/', async function(req, res, next) {
  try {
    res.json(await settings.create(req.body));
  } catch (err) {
    console.error(`Error while creating settings`, err.message);
    next(err);
  }
});

/* PUT programming language */
router.put('/:Email', async function(req, res, next) {
  try {
    res.json(await settings.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating settings`, err.message);
    next(err);
  }
});

/* DELETE programming language */
router.delete('/:Email', async function(req, res, next) {
  try {
    res.json(await settings.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting settings`, err.message);
    next(err);
  }
});

module.exports = router;
