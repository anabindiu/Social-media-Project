const express = require('express');
const router = express.Router();
const has_friend = require('../services/has_friend');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await has_friend.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting has_friend `, err.message);
    next(err);
  }
});

/* POST programming language */
router.post('/', async function(req, res, next) {
  try {
    res.json(await has_friend.create(req.body));
  } catch (err) {
    console.error(`Error while creating has_friend`, err.message);
    next(err);
  }
});

/* PUT programming language */
router.put('/:Email', async function(req, res, next) {
  try {
    res.json(await has_friend.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating has_friend`, err.message);
    next(err);
  }
});

/* DELETE programming language */
router.delete('/:Email', async function(req, res, next) {
  try {
    res.json(await has_friend.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting has_friend`, err.message);
    next(err);
  }
});

module.exports = router;
