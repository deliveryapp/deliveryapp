define(function(require, exports, module) {
    var Marionette = require('marionette'),
        MainStatisticView = require('hbs!statistic/view/templates/main-statistic-view');


    module.exports = Marionette.CompositeView.extend({
        template: MainStatisticView

    });


});