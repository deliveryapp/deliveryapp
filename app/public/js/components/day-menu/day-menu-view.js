define(function(require, exports, module){

    var Marionette = require('marionette'),
        DishCardView = require('dishCardView'),
        DishCardEmpty = require('dishCardEmpty'),
        template = require('hbs!../components/day-menu/templates/day-menu-view');

    module.exports = Marionette.CompositeView.extend({
        tagName: 'div',
        className: 'b-card__dishes b-card__dishes_no-top-border',
        childView: DishCardView,
        emptyView: DishCardEmpty,
        template: template,
        nameFilterValue: '',
        ui : {
           select : '#categoryFilter'
        },
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
            this.collection.remove(model);
        },
        dishAdded: function () {
            this.trigger('dishAdded', this.model);
        },
        changed:function(evt) {
            this.trigger('filter:by:name:applied', evt.currentTarget.value, this.$('#categoryFilter').val() );
        },
        categoryChanged:function(evt) {
            this.trigger('filter:by:category:applied', evt.currentTarget.value, this.$('#input-name').val());
        },
        resetFilter: function () {
            this.ui.select[0].value = '0';
        }
    });
});