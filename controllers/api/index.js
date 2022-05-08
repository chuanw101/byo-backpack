const router = require('express').Router();

const userRoutes = require('./userRoutes');
router.use('/users', userRoutes);

const eventRoutes = require("./eventRoutes");
router.use("/events", eventRoutes);

const itemRoutes = require("./itemRoutes");
router.use("/items",itemRoutes);

module.exports = router;