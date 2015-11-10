define(function(require, exports, module){

    var Marionette = require('marionette'),
        template = require('hbs!../components/admin-dish-card/templates/admin-dish-card-empty');

    module.exports = Marionette.ItemView.extend({
        template: template,
        className: 'b-selected-dish b-selected-dish_empty'
    });
});