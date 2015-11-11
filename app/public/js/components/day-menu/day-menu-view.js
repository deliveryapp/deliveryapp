define(function(require, exports, module){

    var Marionette = require('marionette'),
        DishCardView = require('dishCardView'),
        DishCardEmpty = require('dishCardEmpty'),
        template = require('hbs!../components/day-menu/templates/day-menu-view');

    module.exports = Marionette.CompositeView.extend({
        tagName: 'div',
        className: 'b-card__dishes',
        childView: DishCardView,
        emptyView: DishCardEmpty,
        template: template,
        nameFilterValue: '',

        events: {
            'click #add-dish': 'dishAdded',
            'change input' :'changed',
            'change select' :'categoryChanged'
        },

        childEvents:{
            'dish:added': 'dishAddedM'
        },
        dishAddedM: function (evt, model) {
            this.trigger('dish:added', model);
        },
        dishAdded: function () {
            this.trigger('dishAdded', this.model);
        },
        changed:function(evt) {
            this.trigger('filter:by:name:applied', evt.currentTarget.value);
        },
        categoryChanged:function(evt) {
            this.trigger('filter:by:category:applied', evt.currentTarget.value);
        },
        initialize: function () {

        }
    });
});