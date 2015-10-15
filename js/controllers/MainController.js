define(function(require, exports, module){
    var Marionette = require("marionette"),
        $ = require("jquery"),
        _ = require("underscore"),
        DishesCollection = require("DishesCollection"),
        DaysMenuCollection = require("DaysMenuCollection"),
        UserDaysMenuCollection = require("UserDaysMenuCollection");

    module.exports = Marionette.Object.extend({
        regions: new Marionette.RegionManager({
            regions: {
                "main": "#application",
                "aRegion": ".orders"
            }
        }),
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

                    this.view = new Main({
                        collection: ordersColl,
                        model: new Backbone.Model()
                    });


                    this.mergeItemsWithOrders(orders,booksCollection);

                    this.regions.get("aRegion").show(this.view);

                }.bind(this));
        },

        mergeDishesWithDays: function (daysMenuCollection, dishesCollection) {

        },
        mergeDishesWithUser: function (userDaysMenuCollection, dishesCollection) {

        }
    });
});