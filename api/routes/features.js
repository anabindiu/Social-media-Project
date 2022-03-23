const express = require('express');
const router = express.Router();
const features = require('../services/features');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await features.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting features `, err.message);
    next(err);
  }
});

/* POST programming language */
router.post('/', async function(req, res, next) {
  try {
    res.json(await features.create(req.body));
  } catch (err) {
    console.error(`Error while creating features`, err.message);
    next(err);
  }
});

/* PUT programming language */
router.put('/:profile_Email', async function(req, res, next) {
  try {
    res.json(await features.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating features`, err.message);
    next(err);
  }
});

/* DELETE programming language */
router.delete('/:profile_Email', async function(req, res, next) {
  try {
    res.json(await features.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting features`, err.message);
    next(err);
  }
});

module.exports = router;
