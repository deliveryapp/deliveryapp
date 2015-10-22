define(function(require, exports, module) {
    var Marionette = require('marionette'),
        DayUserMenuView = require('hbs!dashboard/view/templates/DayUserMenuView');


    module.exports = Marionette.ItemView.extend({
        tagName: 'li',
        className: 'ordersList',
        template: DayUserMenuView,



    });



});