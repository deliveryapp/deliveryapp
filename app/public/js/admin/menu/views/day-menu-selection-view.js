define(function(require, exports, module){

    var Marionette = require('marionette'),
        AdminDishCardView = require('adminDishCardView'),
        AdminDishCardEmpty = require('adminDishCardEmpty'),
        template = require('hbs!menu/views/templates/day-menu-selection-view');

    module.exports = Marionette.CompositeView.extend({

        template: template,
        childView: AdminDishCardView,
        emptyView: AdminDishCardEmpty,
        childViewContainer: '.js-selected-day-menu',
        childEvents:{
            'dish:removed': 'dishRemoved'
        },
        events: {
            'click .js-button-icon-save-day-menu': 'saveDayMenu'
        },

        saveDayMenu: function () {
            this.trigger('day:menu:saved',this.collection);
        },
        dishRemoved: function (view, model) {
            this.collection.remove(model);
            this.trigger('day:menu:dish:removed', model);
            //debugger;
        }
    });
});