const router = require('express').Router();
const { User,Event } = require('../models');
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use(homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
