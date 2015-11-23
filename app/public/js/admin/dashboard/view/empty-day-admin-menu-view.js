define(function(require, exports, module) {
    var Marionette = require('marionette'),
        EmptyDayAdminMenuView = require('hbs!dashboard/view/templates/empty-day-admin-menu-view');

    module.exports = Marionette.ItemView.extend({
        template: EmptyDayAdminMenuView,
        className: 'b-user-day-menu-layer__list_empty'
    });
});