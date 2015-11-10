define(function(require, exports, module) {
    var Marionette = require('marionette'),
        MainAddDishView = require('hbs!add-dish/view/templates/main-add-dish-view');

    module.exports = Marionette.LayoutView.extend({
        template: MainAddDishView


    });


});