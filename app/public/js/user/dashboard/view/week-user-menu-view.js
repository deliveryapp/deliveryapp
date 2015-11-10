define(function(require, exports, module) {
    var Marionette = require('marionette'),
        DayUserMenuView = require ('dayUserMenuView'),
        DishesCollection = require('dishesCollection'),
        EmptyDayUserMenuView = require('emptyDayUserMenuView'),
        WeekUserMenuView = require('hbs!dashboard/view/templates/week-user-menu-view');


    module.exports = Marionette.CompositeView.extend({
        template:WeekUserMenuView,
        tagName: 'li',
        className: 'b-week-orders-list__list-point',
        childViewContainer: '#dish-list',
        childView: DayUserMenuView,
        childViewOptions: function () {
         return { collection: this.collection };
        },

        getEmptyView: function() {
            return EmptyDayUserMenuView;
        },

        initialize: function() {
            this.collection = new DishesCollection(this.model.get('dishes'));
        }
    });

});