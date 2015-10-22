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
            if (this.collection.first().get('name') === "<EMPTY>"){
                return { collection: this.collection, tagName: 'div', className: 'empty'};
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