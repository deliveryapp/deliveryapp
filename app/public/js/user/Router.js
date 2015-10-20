define(function(require, exports, module){
    var Marionette = require('marionette'),
        MainController = require('MainController');

    module.exports = Marionette.AppRouter.extend({
        controller: new MainController(),

        appRoutes: {
            '':'index',
            'dashboard': 'dashboard',
            'menu': 'menu'
        }


    });
});