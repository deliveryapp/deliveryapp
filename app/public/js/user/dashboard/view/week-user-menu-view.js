define(function(require, exports, module) {
    var Marionette = require('marionette'),
        DayUserMenuView = require ('dayUserMenuView'),
        DishesCollection = require('dishesCollection'),
        WeekUserMenuView = require('hbs!dashboard/view/templates/week-user-menu-view');


    module.exports = Marionette.CompositeView.extend({
        template:WeekUserMenuView,
        tagName: 'li',
        className: 'b-week-orders-list__list-point',
        childViewContainer: '#dish-list',
        childView: DayUserMenuView,
        childViewOptions: function () {
            if (this.collection.first().get('name') === '<EMPTY>'){
                return { collection: this.collection, tagName: 'div', className: 'b-user-day-menu-layer__list_empty'};
            }
            else{return { collection: this.collection };}
        },

        initialize: function(){
            this.collection = new DishesCollection(this.model.get('dishes'));
            if (this.collection.length == 0){
            console.log(this.collection);
                this.collection = new DishesCollection([{name: '<EMPTY>'}]);
            }
        }
    });

});