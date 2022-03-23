const express = require('express');
const router = express.Router();
const view = require('../services/view');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await view.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting view `, err.message);
    next(err);
  }
});

/* POST programming language */
router.post('/', async function(req, res, next) {
  try {
    res.json(await view.create(req.body));
  } catch (err) {
    console.error(`Error while creating view`, err.message);
    next(err);
  }
});

/* PUT programming language */
router.put('/:Admin_Email', async function(req, res, next) {
  try {
    res.json(await view.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating view`, err.message);
    next(err);
  }
});

/* DELETE programming language */
router.delete('/:Admin_Email', async function(req, res, next) {
  try {
    res.json(await view.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting view`, err.message);
    next(err);
  }
});

module.exports = router;
