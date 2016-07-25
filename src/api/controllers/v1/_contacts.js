'use strict';

var router = require('express').Router({mergeParams: true})
  , ContactModel = require('../../models').contact.model
  , _ = require('underscore')
  , moment = require('moment');

// 
router.route('/')

  // Get list of contacts
  // 
  // @method GET
  // @return contacts
  .get(function(req, res, next) {
    return ContactModel.find({}, function (err, contacts) {
      if (err) return next(err);

      res.data = {
        'contacts': contacts
      };

      next();
    });
  })

  // Create new contact
  // 
  // @method POST
  // @return contact
  .post(function(req, res, next) {
    var contact = new ContactModel;
    contact.enabled = req.body.enabled;
    contact.name = req.body.name;

    contact.save().then(function (doc) {
      res.data = {
        'contact': doc
      };
      
      next();
    });
  })
;

module.exports = router;