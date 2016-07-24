'use strict';

var router = require('express').Router({mergeParams: true})
  , EventModel = require('../../models').event.model
;

// 
router.route('/')

  // Get specific event
  // 
  // @method GET
  // @return event
  .get(function(req, res, next) {
    var eventId = req.params.eventId;

    return EventModel.findOne({id: eventId}, function (err, event) {
      if (err) return next(err);
      return res.json(event);
    });
  })

  // Save one event
  // 
  // @method PUT
  // @return event
  .put(function(req, res, next) {
    var eventId = req.params.eventId;

    return EventModel.findOne({id: eventId}, function (err, event) {
      if (err) return next(err);

      event.title = req.body.title;
      event.date = req.body.date;

      event.save().then(function (doc) {
        return res.json(doc);
      });
    })
  })

  // @method DELETE
  // @return event
  .delete(function(req, res, next) {
    var eventId = req.params.eventId;

    return EventModel.findOne({id: eventId}, function (err, event) {
      if (err) return next(err);

      event.remove().then(function (a,b) {
        return res.json({});
      });
    })
  })
;

module.exports = router;