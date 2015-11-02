define(function (require, exports, module) {
    var Marionette = require('marionette'),
        $ = require('jquery'),
        DaysMenuCollection = require('daysMenuCollection'),
        TabsView = require('tabCollectionView'),
        VirtualCollection = require('backboneVirtualCollection'),
        CardView = require('cardLayoutView'),
        DayMenuView = require('dayMenuView');

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

            this.dishesCollection = new VirtualCollection(new Backbone.Collection(this.dayMenuDishes[0].get('dishes')), {

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
            this.listenTo(this.cardView, 'days:swap', this.tabsStatus);
            this.listenTo(this.dayMenuView, 'dish:added', this.dishAdded);
            this.listenTo(this.dayMenuView, 'filter:by:name:applied', this.nameFilterApplied);
            //filter:by:category:applied
            this.listenTo(this.dayMenuView, 'filter:by:category:applied', this.categoryFilterApplied);
            return this.cardView;

        },

        nameFilterApplied: function (phrase) {
            this.dishesCollection.updateFilter(function (model) {
                return model.get('name').toLowerCase().indexOf(phrase) > -1;
            });
            this.dayMenuView.render();
        },

        categoryFilterApplied: function (phrase) {
            this.dishesCollection.updateFilter(function (model) {
                return model.get('category').toLowerCase().indexOf(phrase) > -1;
            });
            this.dayMenuView.render();
        },

        dishAdded: function (model) {
            this.trigger('dish:added', model);
        },

        tabsStatus: function (e) {
            this.dishesCollection = new VirtualCollection(new Backbone.Collection(e.model.get('dishes')));
            this.dayMenuView.collection =  this.dishesCollection;
            this.dayMenuView.render();
            this.trigger('tab:changed', e.model.get('day'));
        }

    });
});