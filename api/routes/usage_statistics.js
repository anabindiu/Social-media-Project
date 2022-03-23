const express = require('express');
const router = express.Router();
const usage_statistics = require('../services/usage_statistics');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await usage_statistics.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting usage_statistics `, err.message);
    next(err);
  }
});

/* POST programming language */
router.post('/', async function(req, res, next) {
  try {
    res.json(await usage_statistics.create(req.body));
  } catch (err) {
    console.error(`Error while creating usage_statistics`, err.message);
    next(err);
  }
});

/* PUT programming language */
router.put('/:profile_Email', async function(req, res, next) {
  try {
    res.json(await usage_statistics.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating usage_statistics`, err.message);
    next(err);
  }
});

/* DELETE programming language */
router.delete('/:profile_Email', async function(req, res, next) {
  try {
    res.json(await usage_statistics.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting usage_statistics`, err.message);
    next(err);
  }
});

module.exports = router;
