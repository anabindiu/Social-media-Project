const express = require('express');
const router = express.Router();
const send_report = require('../services/send_report');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await send_report.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting send_report `, err.message);
    next(err);
  }
});

/* POST programming language */
router.post('/', async function(req, res, next) {
  try {
    res.json(await send_report.create(req.body));
  } catch (err) {
    console.error(`Error while creating send_report`, err.message);
    next(err);
  }
});

/* PUT programming language */
router.put('/:User_eMail', async function(req, res, next) {
  try {
    res.json(await send_report.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating send_report`, err.message);
    next(err);
  }
});

/* DELETE programming language */
router.delete('/:User_eMail', async function(req, res, next) {
  try {
    res.json(await send_report.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting send_report`, err.message);
    next(err);
  }
});

module.exports = router;
