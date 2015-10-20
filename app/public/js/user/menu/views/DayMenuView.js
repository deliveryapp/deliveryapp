define(function(require, exports, module){

    var Marionette = require('marionette'),
        DishCardView = require('DishCardView'),
        template = require('hbs!menu/views/templates/DayMenuView');

    module.exports = Marionette.CompositeView.extend({
        tagName: 'div',
        className: 'col s12',
        childView: DishCardView,
        template: template,

        initialize: function () {
            //var temp = this.collection;
        },
        onRender: function () {
            var temp = this.collection;
        }
    });
});