module.exports = function (app) {

  // @route /api/v1/
  app.use('/api/v1', require('./controllers/v1'));
}