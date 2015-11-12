define(function(require, exports, module) {
    var Marionette = require('marionette'),
        MainDashboardView = require('hbs!dashboard/view/templates/main-dashboard-view');


    module.exports = Marionette.CompositeView.extend({
        template: MainDashboardView

    });


});