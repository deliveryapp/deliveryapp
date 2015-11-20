define(function(require, exports, module) {
    var Marionette = require('marionette'),
        DayAdminMenuView = require ('dayAdminMenuView'),
        DishesCollection = require('dishesCollection'),
        EmptyDayAdminMenuView = require('emptyDayAdminMenuView'),
        WeekAdminMenuView = require('hbs!dashboard/view/templates/week-admin-menu-view');


    module.exports = Marionette.CompositeView.extend({
        template:WeekAdminMenuView,
        tagName: 'li',
        className: 'b-week-orders-list__list-point',
        childViewContainer: '#dish-list',
        childView: DayAdminMenuView,

        childViewOptions: function () {
            return { collection: this.collection };
        },

        getEmptyView: function() {
            return EmptyDayAdminMenuView;
        },

        initialize: function() {
            this.collection = new DishesCollection(this.model.get('dishes'));
        }
    });

});