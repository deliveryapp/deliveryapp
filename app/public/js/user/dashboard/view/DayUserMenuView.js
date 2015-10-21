define(function(require, exports, module) {
    var Marionette = require('marionette'),
        DayUserMenuView = require('hbs!dashboard/view/templates/DayUserMenuView');


    module.exports = Marionette.ItemView.extend({
        tagName: 'li',
        class: 'ordersList',
        template: DayUserMenuView
    });

});