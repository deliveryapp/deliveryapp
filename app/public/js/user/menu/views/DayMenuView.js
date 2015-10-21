define(function(require, exports, module){

    var Marionette = require('marionette'),
        DishCardView = require('DishCardView'),
        template = require('hbs!menu/views/templates/DayMenuView');

    module.exports = Marionette.CompositeView.extend({
        tagName: 'div',
        className: 'col s12',
        childView: DishCardView,
        template: template,

        childEvents:{
            'dishClicked': 'dishClickedM'
        },
        dishClickedM: function (evt,model) {
            //console.log(model);
            var ingridients = model.get('ingridients');
            this.model = model;
            this.render();
            //console.log(ingridients);
        },
        initialize: function () {

        }
    });
});