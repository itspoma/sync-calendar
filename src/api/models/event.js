module.exports = function () {
  'use strict';

  var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , moment = require('moment');

  var EventSchema = new Schema({
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
    title: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: false,
      default: Date.now
    }
  });

  var EventModel = mongoose.model('Event', EventSchema);

  return {
    'schema': EventSchema,
    'model': EventModel
  }
};