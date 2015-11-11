define(function(require, exports, module) {
    var Marionette = require('marionette'),
        EmptyDishView = require('hbs!dish-list/view/templates/empty-dish-view');
    
    module.exports = Marionette.ItemView.extend({
        template: EmptyDishView,
        className: 'b-personal-info b-user-list_empty-list'

    });
});
