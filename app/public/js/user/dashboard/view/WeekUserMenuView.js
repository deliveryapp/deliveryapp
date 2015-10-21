define(function(require, exports, module) {
    var Marionette = require('marionette'),
        DayUserMenuView = require ('DayUserMenuView'),
        WeekUserMenuView = require('hbs!dashboard/view/templates/WeekUserMenuView');


    module.exports = Marionette.CompositeView.extend({
        template:WeekUserMenuView,
        tagName: 'li',
        className: 'orders',
        childView: DayUserMenuView
    });


});