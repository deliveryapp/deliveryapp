define(function(require, exports, module){
    //require("materialize");
    var Marionette = require("marionette"),
        $ = require("jquery"),
        _ = require("underscore"),
        DishesCollection = require("DishesCollection"),
        Tabs = require("views/tabsView"),
        DaysMenuCollection = require("DaysMenuCollection"),
        //materialize = require("materialize"),
        UserDaysMenuCollection = require("UserDaysMenuCollection");


    module.exports = Marionette.Object.extend({

        regions: new Marionette.RegionManager({
            regions: {
                "main": "#application",
                "aRegion": ".tabsContainer"
            }
        }),
        tabsDays: new Backbone.Collection([
            { name: "Monday"}
        ]),
        initialize: function () {

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
                    //console.log(daysMenuCollection);

                    this.view = new Tabs({
                        collection: this.tabsDays
                    });


                    //this.mergeItemsWithOrders(orders,booksCollection);

                    this.regions.get("aRegion").show(this.view);
                    var temp = $('ul.tabs');
                    //debugger;
                    //$('ul.tabs').tabs();
                    //setTimeout(function () {
                    debugger;
                        $('ul.tabs').tabs();

                    //},1000)
                }.bind(this));
        },

        mergeDishesWithDays: function (daysMenuCollection, dishesCollection) {

        },
        mergeDishesWithUser: function (userDaysMenuCollection, dishesCollection) {

        }
    });
});