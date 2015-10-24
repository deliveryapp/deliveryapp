define(function(require, exports, module) {
    var Marionette = require('marionette'),
        DayUserMenuView = require('hbs!dashboard/view/templates/dayUserMenuView');
    
    module.exports = Marionette.ItemView.extend({
        tagName: 'li',
        className: 'ordersList',
        template: DayUserMenuView
    });
});