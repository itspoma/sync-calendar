module.exports = function () {
  'use strict';

  var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

  var Tag = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false }
  });

  var TagModel = mongoose.model('Tag', Tag);

  return {
    'schema': Tag,
    'model': TagModel
  }
};