define(function(require, exports, module){
    var Marionette = require('marionette'),
        Router = require('router'),

    application = new Marionette.Application();

    application.on('before:start', function(){
        new Router();
        Backbone.history.start();  //{pushState: true, root: "/deliveryapp/"}  remove hash
        /*$.ajax({
            url: 'http://cryptic-beach-3112.herokuapp.com/dishes',
            type: 'get',
            crossDomain: true,
            success: function(data) { alert(data); }
        });*/
    });

    module.exports = application;
});