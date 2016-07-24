module.exports = function(router) {
  'use strict';

  var express = require('express')
    , router = express.Router()
    , TagModel = require('../../models/tags')().model
    , _ = require('underscore');

  // 
  router.route('/')
    // get list of tags
    .get(function(req, res, next) {
      return TagModel.find({}, function (err, products) {
        if (err) return next(err);

        res.data = {
          'products': products
        };

        next();
      });
    })

    // create new tag
    .post(function(req, res, next) {
      var x = new ProductModel;
      x.title = 'test';
      x.save();

      res.json({ message: 'new tag' });
    });

  // 
  router.route('/:tagId')
    
    // Return tag
    .get(function(req, res, next) {
      res.json({ message: 'get tag' });
    }) 
    
    // Update tag
    .put(function(req, res, next) {
      res.json({ message: 'update tag' });
    })
    
    // Patch
    .patch(function(req, res,next) {
      res.json({ message: 'patch tag' });
    })
    
    // Delete record
    .delete(function(req, res, next) {
      res.json({ message: 'delete tag' });
    });

  return router;

}