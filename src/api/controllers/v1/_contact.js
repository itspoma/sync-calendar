'use strict';

var router = require('express').Router({mergeParams: true})
  , ContactModel = require('../../models').contact.model
;

// 
router.route('/')

  // Get specific contact
  // 
  // @method GET
  // @return contact
  .get(function(req, res, next) {
    var contactId = req.params.contactId;

    return ContactModel.findOne({id: contactId}, function (err, contact) {
      if (err) return next(err);
      return res.json(contact);
    });
  })

  // Save one contact
  // 
  // @method PUT
  // @return contact
  .put(function(req, res, next) {
    var contactId = req.params.contactId;

    return ContactModel.findOne({id: contactId}, function (err, contact) {
      if (err) return next(err);

      contact.name = req.body.name;

      contact.save().then(function (doc) {
        return res.json(doc);
      });
    })
  })

  // @method DELETE
  // @return contact
  .delete(function(req, res, next) {
    var contactId = req.params.contactId;

    return ContactModel.findOne({id: contactId}, function (err, contact) {
      if (err) return next(err);

      contact.remove().then(function (a,b) {
        return res.json({});
      });
    })
  })
;

module.exports = router;