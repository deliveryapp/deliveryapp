define(function(require, exports, module){

    var Marionette = require('marionette'),
        DishCardView = require('DishCardView'),
        template = require('hbs!../components/DayMenu/templates/DayMenuView');

    module.exports = Marionette.CompositeView.extend({
        tagName: 'div',
        className: 'col s12',
        childView: DishCardView,
        template: template,

        childEvents:{
            'dishClicked': 'dishClickedM'
        },
        dishClickedM: function (evt,model) {
            this.model = model;
            this.render();
        },
        initialize: function () {

        }
    });
});