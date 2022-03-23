const express = require('express');
const router = express.Router();
const modify = require('../services/modify');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await modify.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting modify `, err.message);
    next(err);
  }
});

/* POST programming language */
router.post('/', async function(req, res, next) {
  try {
    res.json(await modify.create(req.body));
  } catch (err) {
    console.error(`Error while creating modify`, err.message);
    next(err);
  }
});

/* PUT programming language */
router.put('/:Admin_Email', async function(req, res, next) {
  try {
    res.json(await modify.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating modify`, err.message);
    next(err);
  }
});

/* DELETE programming language */
router.delete('/:Admin_Email', async function(req, res, next) {
  try {
    res.json(await modify.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting modify`, err.message);
    next(err);
  }
});

module.exports = router;
