define(function(require, exports, module){
    var Marionette = require('marionette'),
        Router = require('Router'),
        MainController = require("MainController");


    application = new Marionette.Application();

    application.on('before:start', function(){
        new Router();
        Backbone.history.start();  //{pushState: true, root: "/deliveryapp/"}  remove hash
    });

    module.exports = application;
});