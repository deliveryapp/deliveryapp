define(function (require, exports, module) {
    var Marionette = require('marionette'),
        $ = require('jquery'),
        WeekOrderView = require('weekOrderView'),
        emptyUserView = require('emptyUserView'),
        AdminWeekOrderListView = require('hbs!dashboard/view/templates/admin-weekorder-list-view');


    module.exports = Marionette.CompositeView.extend({
        template: AdminWeekOrderListView,
        childView: WeekOrderView,
        childViewContainer: '.b-weekOrder-list',

        getEmptyView: function () {
            return emptyUserView;
        }
    });
});
