const router = require('express').Router();
const { User, Event } = require('../models');

// home route
router.get('/', (req, res) => {
  res.status(201).send("server check")
});


module.exports = router;
