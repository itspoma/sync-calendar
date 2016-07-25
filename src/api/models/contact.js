module.exports = function () {
  'use strict';

  var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , moment = require('moment');

  var ContactSchema = new Schema({
    id: {
      type: Number,
      default: function () {
        return +moment();
      },
      required: false
    },
    enabled: {
      type: String,
      required: false,
      default: true
    },
    name: {
      type: String,
      required: true
    }
  });

  var ContactModel = mongoose.model('Contact', ContactSchema);

  return {
    'schema': ContactSchema,
    'model': ContactModel
  }
};