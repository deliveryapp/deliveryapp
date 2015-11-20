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
            'dashboard/:current': 'dashboardCurrent',
            'statistic': 'statistic',
            'statistic/current': 'statisticCurrent',
            'menu': 'menu',
            'userlist': 'userlist',
            'dish/add': 'addDish'
        }


    });
});