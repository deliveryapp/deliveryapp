define(function(require, exports, module){
    var Marionette = require("marionette"),
        $ = require("jquery"),
        _ = require("underscore"),
        MainController = require('mainController');

    module.exports = Marionette.AppRouter.extend({
        controller: new MainController(),

        appRoutes: {
            '':'dashboard',
            'dashboard': 'dashboard',
            'statistic': 'statistic',
            'menu': 'menu',
            'userlist': 'userlist',
            'dish/add': 'addDish'
        }


    });
});