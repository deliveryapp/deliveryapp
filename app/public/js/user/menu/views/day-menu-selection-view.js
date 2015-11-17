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
            'dish:removed': 'dishRemoved',
            'quantity:minus': 'quantityUpdated',
            'quantity:plus': 'quantityUpdated'
        },
        events: {
            'click .js-button-icon-save-day-menu': 'saveDayMenu'
        },
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },
        saveDayMenu: function () {
            this.trigger('user:day:menu:saved',this.collection);
        },
        dishRemoved: function (view, model) {
            this.collection.remove(model);
            this.updateSummary();
        },
        quantityUpdated: function (view) {
            //debugger;
            this.updateSummary();
        },
        setModel: function (model) {
            this.listenTo(this.model, 'change', this.render);
            //this.model.set('summary', model.get('summary'));
        },
        updateSummary: function () {
            this.model.set('summary', this.collection.calculateSummary());
            this.render();
        }

        /*initialize: function () {
            this.model.set('summary', this.collection.getSu
        }*/
    });
});