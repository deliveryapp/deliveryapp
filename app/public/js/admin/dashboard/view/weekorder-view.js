define(function (require, exports, module) {
    var Marionette = require('marionette'),
        WeekOrderView = require('hbs!dashboard/view/templates/weekorder-view');

    module.exports = Marionette.ItemView.extend({
        className: 'b-ord__row',
        template: WeekOrderView,

        initialize: function () {

        }
    });
});
