define(function (require, exports, module) {
    var Marionette = require('marionette'),
        $ = require('jquery'),
        DaysMenuCollection = require('daysMenuCollection'),
        TabsView = require('tabCollectionView'),
        VirtualCollection = require('backboneVirtualCollection'),
        CardView = require('cardLayoutView'),
        DayMenuView = require('dayMenuView');

    module.exports = Marionette.Object.extend({
        getUserItem: function () {
            this.collection = this.getOption('collection');

            this.weekDays = this.collection.filter(function (item) {
                return item.get('day');
            });

            this.dayMenuDishes = this.collection.filter(function (item) {
                return item.get('dishes');
            });

            this.dishesCollection = new VirtualCollection(new Backbone.Collection(this.dayMenuDishes[0].get('dishes')), {

            });
            var cardView = this.getItem();
            this.listenTo(this.cardView, 'days:swap', this.tabsStatus);
            return cardView;
        },

        getAdminItem: function (daysMenuCollection) {
            this.collection = this.getOption('collection');

            this.weekDays = daysMenuCollection.filter(function (item) {
                return item.get('day');
            });

            this.dishesCollection = new VirtualCollection(this.collection, {});
            var cardView = this.getItem();
            this.listenTo(this.cardView, 'days:swap', this.tabsStatusAdmin);
            return cardView;
        },

        getItem: function () {
            this.tabsView = new TabsView({
                collection: new Backbone.Collection(this.weekDays)
            });

            this.dayMenuView = new DayMenuView({
                collection: this.dishesCollection
            });

            this.cardView = new CardView({
                model: new Backbone.Model(),
                childViews: {
                    tabs: this.tabsView,
                    days: this.dayMenuView
                }
            });
            this.listenTo(this.dayMenuView, 'dish:added', this.dishAdded);
            this.listenTo(this.dayMenuView, 'filter:by:name:applied', this.nameFilterApplied);
            this.listenTo(this.dayMenuView, 'filter:by:category:applied', this.categoryFilterApplied);
            return this.cardView;

        },

        nameFilterApplied: function (phrase) {
            this.dishesCollection.updateFilter(function (model) {
                return model.get('name').toLowerCase().indexOf(phrase) > -1;
            });
        },

        categoryFilterApplied: function (phrase) {
            this.dishesCollection.updateFilter(function (model) {
                return model.get('category').toLowerCase().indexOf(phrase) > -1;
            });
        },

        dishAdded: function (model) {
            this.trigger('dish:added', model);
        },

        tabsStatusAdmin: function (e) {
            this.trigger('tab:changed', e.model.get('day'));
        },

        tabsStatus: function (e) {
            this.dishesCollection.reset();
            var dayDishes = new Backbone.Collection(e.model.get('dishes'));
            dayDishes.map(function (model) {
                this.dishesCollection.add(model);
            }.bind(this));
            this.trigger('tab:changed', e.model.get('day'));
        }

    });
});