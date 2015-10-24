define(function(require, exports, module){
    var Marionette = require('marionette'),
        MainController = require('mainController');

    module.exports = Marionette.AppRouter.extend({
        controller: new MainController(),

        appRoutes: {
            '':'index',
            'dashboard': 'dashboard',
            'dashboard/NextWeek': 'nextWeek',
            'menu': 'menu'
        }

    });
});