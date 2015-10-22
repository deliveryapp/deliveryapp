define(function(require, exports, module){

    var Marionette = require('marionette'),
        DishCardView = require('DishCardView'),
        template = require('hbs!../components/DayMenu/templates/DayMenuView');

    module.exports = Marionette.CompositeView.extend({
        tagName: 'div',
        className: 'col s12',
        childView: DishCardView,
        template: template,

        events: {
            'click #add-dish': 'dishAdded'
        },

        childEvents:{
            'dishClicked': 'dishClickedM'
        },
        dishClickedM: function (evt,model) {
            this.model = model;
            this.render();
        },
        dishAdded: function () {
            this.trigger('dishAdded', this.model);
        },
        initialize: function () {

        }
    });
});