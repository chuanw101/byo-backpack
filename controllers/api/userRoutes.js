const router = require('express').Router();
const { User,Event} = require('../../models');
const bcrypt = require("bcrypt");

//user home route
router.get('/', (req, res) => {
    res.status(201).send("user server check")
  
  });
module.exports = router;
