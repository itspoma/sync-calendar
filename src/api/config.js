module.exports = function (app) {
  var nconf = require('nconf');

  require('nconf-strip-json-comments')(nconf);

  nconf
   // .use('memory')
   .argv()
   .env()
   .file('base', __dirname + "/config/default.json")
   .file('environment', __dirname + "/config/development.json")
   .defaults({
    "port": 3000
   })
   // .file({file: "config/" + (nconf.get('ENV') || 'production') + ".json", dir:__dirname, search:true})
  ;

  app.set('port', nconf.get('port'));
}