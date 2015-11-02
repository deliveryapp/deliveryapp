define(function(require, exports, module){

    var Marionette = require('marionette'),
        DishCardView = require('dishCardView'),
        template = require('hbs!../components/dayMenu/templates/dayMenuView');

    module.exports = Marionette.CompositeView.extend({
        tagName: 'div',
        className: 'col s12',
        childView: DishCardView,
        template: template,
        nameFilterValue: '',

        events: {
            'click #add-dish': 'dishAdded',
            'change input' :'changed',
            'change select' :'categoryChanged'
        },

        childEvents:{
            'dish:clicked': 'dishClickedM',
            'dish:added': 'dishAddedM'
        },
        dishClickedM: function (evt,model) {
            this.model = model;
            this.render();
        },
        dishAddedM: function (evt, model) {
            this.trigger('dish:added', model);
        },
        dishAdded: function () {
            this.trigger('dishAdded', this.model);
        },
        changed:function(evt) {
            console.log(evt.currentTarget.value);
            this.trigger('filter:by:name:applied', evt.currentTarget.value);
        },
        categoryChanged:function(evt) {
            console.log(evt.currentTarget.value);
            this.trigger('filter:by:category:applied', evt.currentTarget.value);
        },
        initialize: function () {

        }
    });
});