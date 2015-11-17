define(function(require, exports, module){

    var Marionette = require('marionette'),
        UserDishCardView = require('userDishCardView'),
        UserDishCardEmpty = require('userDishCardEmpty'),
        template = require('hbs!menu/views/templates/day-menu-selection-view');

    module.exports = Marionette.CompositeView.extend({

        template: template,
        childView: UserDishCardView,
        emptyView: UserDishCardEmpty,
        childViewContainer: '.js-selected-day-menu',
        childEvents:{
            'dish:removed': 'dishRemoved'
        },
        events: {
            'click .js-button-icon-save-day-menu': 'saveDayMenu'
        },
        saveDayMenu: function () {
            this.trigger('user:day:menu:saved',this.collection);
        },
        dishRemoved: function (view, model) {
            this.collection.remove(model);
        },
        calculateSummary: function () {
            var dishes = this.get('dishes');
            var res = dishes.reduce(function(orderSummary, item){
                return orderSummary + item.get('price');
            }, 0);
            return res;
        }

        /*initialize: function () {
            this.model.set('summary', this.collection.getSu
        }*/
    });
});