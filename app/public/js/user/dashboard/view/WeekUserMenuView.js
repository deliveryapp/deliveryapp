define(function(require, exports, module) {
    var Marionette = require('marionette'),
        DayUserMenuView = require ('DayUserMenuView'),
        DishesCollection = require('DishesCollection'),
        WeekUserMenuView = require('hbs!dashboard/view/templates/WeekUserMenuView');


    module.exports = Marionette.CompositeView.extend({
        template:WeekUserMenuView,
        tagName: 'li',
        className: 'orders',
        childViewContainer: '#dish-list',
        childView: DayUserMenuView,
        childViewOptions: function () {
            return { collection: new DishesCollection(this.model.get('dishes')) };
        },

        initialize: function(){
            this.collection = new DishesCollection(this.model.get('dishes'));
            console.log(this.collection);

        }
    });




});