define(function(require, exports, module) {
    var Marionette = require('marionette'),
        DayAdminMenuView = require('hbs!dashboard/view/templates/day-admin-menu-view');

    module.exports = Marionette.ItemView.extend({
        tagName: 'li',
        className: 'b-user-day-menu-list',
        template: DayAdminMenuView
    });
});