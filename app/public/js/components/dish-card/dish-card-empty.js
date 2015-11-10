define(function(require, exports, module){

    var Marionette = require('marionette'),
        template = require('hbs!../components/dish-card/templates/dish-card-empty');

    module.exports = Marionette.ItemView.extend({
        template: template,
        className: 'b-dish_empty'
    });
});