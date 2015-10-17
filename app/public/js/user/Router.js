define(function(require, exports, module){
    var Marionette = require("marionette"),
        $ = require("jquery"),
        _ = require("underscore"),
        DishesCollection = require("DishesCollection"),
        DaysMenuCollection = require("DaysMenuCollection"),
        headerView = require('headerView'),
        MainController = require('MainController'),
        UserDaysMenuCollection = require("UserDaysMenuCollection");

    module.exports = Marionette.AppRouter.extend({
        controller: new MainController(),

        appRoutes: {
             '':'index',
            'user/dashboard': 'dashboard',
            'user/menu': 'menu'
        }


    });
});