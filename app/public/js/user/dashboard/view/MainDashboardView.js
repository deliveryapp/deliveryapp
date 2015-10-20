define(function(require, exports, module) {
    var Marionette = require('marionette'),
        MainDashboardView = require('hbs!dashboard/view/templates/MainDashboardView');

    module.exports = Marionette.CompositeView.extend({
        template: MainDashboardView
    });


});