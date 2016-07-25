'use strict';

var router = require('express').Router();

router.use('/events', require('./_events'));
router.use('/events/:eventId', require('./_event'));

router.use('/contacts', require('./_contacts'));
router.use('/contacts/:contactId', require('./_contact'));

module.exports = router;