const express = require('express');
const router = express.Router();
const monthly_stats = require('../services/monthly_stats');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await monthly_stats.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting monthly_stats `, err.message);
    next(err);
  }
});

/* POST programming language */
router.post('/', async function(req, res, next) {
  try {
    res.json(await monthly_stats.create(req.body));
  } catch (err) {
    console.error(`Error while creating monthly_stats`, err.message);
    next(err);
  }
});

/* PUT programming language */
router.put('/:profile_Email', async function(req, res, next) {
  try {
    res.json(await monthly_stats.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating monthly_stats`, err.message);
    next(err);
  }
});

/* DELETE programming language */
router.delete('/:profile_Email', async function(req, res, next) {
  try {
    res.json(await monthly_stats.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting monthly_stats`, err.message);
    next(err);
  }
});

module.exports = router;
