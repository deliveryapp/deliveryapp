define(function(require, exports, module){
    var Marionette = require("marionette"),
        $ = require("jquery"),
        _ = require("underscore"),
        DishesCollection = require("DishesCollection"),
        Tabs = require("view/tabsView"),
        DaysMenuCollection = require("DaysMenuCollection"),
        headerView = require('headerView'),
        UserDaysMenuCollection = require("UserDaysMenuCollection");

    module.exports = Marionette.Object.extend({

        regions: new Marionette.RegionManager({
            regions: {
                "main": "#application",
                "content": "#content"

            }
        }),

        initialize: function () {
            this.header = new headerView();
            this.regions.get("main").show(this.header);
            this.start();
        },

        start: function () {
            var dishesCollection = new DishesCollection();
            var daysMenuCollection = new DaysMenuCollection();
            var userDaysMenuCollection = new UserDaysMenuCollection();
            $.when(
                dishesCollection.fetch({reset: true}),
                daysMenuCollection.fetch({reset: true}),
                userDaysMenuCollection.fetch({reset: true})
            ).done(function () {

                    //this.mergeDishesWithDays(dishesCollection,daysMenuCollection);
                    console.log(dishesCollection);
                    console.log(daysMenuCollection);
                    console.log(userDaysMenuCollection);
                }.bind(this));
        },

        menu: function(){
            console.log("menu");
        },

        dashboard: function(){
            console.log("dashboard");

        },

        index: function(){
            console.log("index route");
        }


    });
});