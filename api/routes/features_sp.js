const express = require('express');
const router = express.Router();
const features_sp = require('../services/features_sp');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await features_sp.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting features_sp `, err.message);
    next(err);
  }
});

/* POST programming language */
router.post('/', async function(req, res, next) {
  try {
    res.json(await features_sp.create(req.body));
  } catch (err) {
    console.error(`Error while creating features_sp`, err.message);
    next(err);
  }
});

/* PUT programming language */
router.put('/:profile_Email', async function(req, res, next) {
  try {
    res.json(await features_sp.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating features_sp`, err.message);
    next(err);
  }
});

/* DELETE programming language */
router.delete('/:profile_Email', async function(req, res, next) {
  try {
    res.json(await features_sp.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting features_sp`, err.message);
    next(err);
  }
});

module.exports = router;
