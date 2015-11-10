define(function(require, exports, module) {
    var Marionette = require('marionette'),
        EmptyDayUserMenuView = require('hbs!dashboard/view/templates/empty-day-user-menu-view');
    
    module.exports = Marionette.ItemView.extend({
        template: EmptyDayUserMenuView,
        className: 'b-user-day-menu-layer__list_empty'
    });
});