define(function(require, exports, module){
    var Marionette = require("marionette"),
        $ = require("jquery"),
        _ = require("underscore"),
        DishesCollection = require("DishesCollection"),
        Tabs = require("view/tabsView"),
        DaysMenuCollection = require("DaysMenuCollection"),
        UserDaysMenuCollection = require("UserDaysMenuCollection");

    module.exports = Marionette.Object.extend({

        regions: new Marionette.RegionManager({
            regions: {
                "main": "#application",
                "aRegion": ".tabs"
            }
        }),
        tabsDays: new Backbone.Collection([
            { name: "Monday"},
            { name: "Tuesday"},
            { name: "Wednesday"},
            { name: "Thursday"},
            { name: "Friday"}
        ]),
        initialize: function () {

        },

        start: function () {
            var dishesCollection = new DishesCollection();
            //var daysMenuCollection = new DaysMenuCollection();
            //var userDaysMenuCollection = new UserDaysMenuCollection();
            $.when(
                dishesCollection.fetch({reset: true})
                //daysMenuCollection.fetch({reset: true}),
                //userDaysMenuCollection.fetch({reset: true})
            ).done(function () {

                    //this.mergeDishesWithDays(dishesCollection,daysMenuCollection);
                    console.log(dishesCollection);
                    //console.log(daysMenuCollection);

                    this.view = new Tabs({
                        collection: this.tabsDays,
                        model: new Backbone.Model()
                    });


                    //this.mergeItemsWithOrders(orders,booksCollection);

                    this.regions.get("aRegion").show(this.view);

                }.bind(this));
        },

        mergeDishesWithDays: function (daysMenuCollection, dishesCollection) {

        },
        mergeDishesWithUser: function (userDaysMenuCollection, dishesCollection) {

        }
    });
});