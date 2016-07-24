'use strict';

var router = require('express').Router({mergeParams: true})
  , EventModel = require('../../models').event.model
  , _ = require('underscore')
  , moment = require('moment');

// 
router.route('/')

  // Get list of events
  // 
  // @method GET
  // @return events
  .get(function(req, res, next) {
    return EventModel.find({}, function (err, events) {
      if (err) return next(err);

      res.data = {
        'events': events
      };

      next();
    });
  })

  // Create new event
  // 
  // @method PUT
  // @return event
  .post(function(req, res, next) {
    var event = new EventModel;
    event.enabled = req.body.enabled;
    event.title = req.body.title;
    event.date = req.body.date;

    event.save().then(function (doc) {
      res.data = {
        'event': doc
      };
      
      next();
    });
  })
;

module.exports = router;