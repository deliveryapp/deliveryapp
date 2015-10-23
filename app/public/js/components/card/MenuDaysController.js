define(function (require, exports, module) {
    var Marionette = require('marionette'),
        $ = require('jquery'),
        DaysMenuCollection = require('DaysMenuCollection'),
        TabsView = require('TabCollectionView'),

        CardView = require('CardLayoutView'),
        DayMenuView = require('DayMenuView');

    module.exports = Marionette.Object.extend({

        getItem: function () {
            this.collection = this.getOption('collection');

            this.weekDays = this.collection.filter(function (item) {
                return item.get('day');
            });

            this.dayMenuDishes = this.collection.filter(function (item) {
                return item.get('dishes');
            });


            this.tabsView = new TabsView({
                collection: new Backbone.Collection(this.weekDays)
            });

            this.dayMenuView = new DayMenuView({
                collection: new Backbone.Collection(this.dayMenuDishes[0].get('dishes'))
            });

            this.cardView = new CardView({
                model: new Backbone.Model(),
                childViews: {
                    tabs: this.tabsView,
                    days: this.dayMenuView
                }
            });
            this.listenTo(this.cardView, 'days:swap', this.tabsStatus);
            this.listenTo(this.dayMenuView, 'dishAdded', this.dishAdded);
            return this.cardView;

        },

        dishAdded: function (model) {
            this.trigger('dishAdded', model);
        },

        tabsStatus: function (e) {
            this.dayMenuView.collection =  new Backbone.Collection(e.model.attributes.dishes);
            this.dayMenuView.render();
            this.trigger('tabChanged', e.model.attributes.day);
        }

    });
});