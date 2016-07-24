'use strict';

var router = require('express').Router();

router.use('/events', require('./_events'));
router.use('/events/:eventId', require('./_event'));

module.exports = router;