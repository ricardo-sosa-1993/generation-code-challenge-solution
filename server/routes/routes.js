'use strict';
module.exports = function(app) {
  var location= require('../controllers/controller');


  // todoList Routes
  app.route('/locations').get(location.getLocations);
}
