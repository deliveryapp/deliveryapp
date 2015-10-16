define(function(require, exports, module){
    var Marionette = require("marionette"),
        MainController = require("MainController");
    application = new Marionette.Application();

    application.on("before:start", function(){
        var mainController = new MainController();
        mainController.start();
    });

    module.exports = application;
});