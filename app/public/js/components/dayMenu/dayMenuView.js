define(function(require, exports, module){

    var Marionette = require('marionette'),
        DishCardView = require('dishCardView'),
        template = require('hbs!../components/dayMenu/templates/dayMenuView');

    module.exports = Marionette.CompositeView.extend({
        tagName: 'div',
        className: 'col s12',
        childView: DishCardView,
        template: template,

        events: {
            'click #add-dish': 'dishAdded'
        },

        childEvents:{
            'dishClicked': 'dishClickedM',
            'dishAdded': 'dishAddedM'
        },
        dishClickedM: function (evt,model) {
            this.model = model;
            this.render();
        },
        dishAddedM: function (evt, model) {
            this.trigger('dishAdded', model);
        },
        dishAdded: function () {
            this.trigger('dishAdded', this.model);
        },
        initialize: function () {

        }
    });
});