define(function(require, exports, module) {
    var Marionette = require('marionette'),
        MainAddDishView = require('hbs!addDish/view/templates/mainAddDishView');

    module.exports = Marionette.LayoutView.extend({
        template: MainAddDishView


    });


});