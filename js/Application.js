define(function(require, exports, module){
    var Marionette = require("marionette"),

    application = new Marionette.Application();

    application.on("before:start", function(){
        //
    });

    module.exports = application;
});