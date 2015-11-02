define(function(require, exports, module) {
    var Marionette = require('marionette'),
        headerTemplateHBS = require('hbs!view/templates/MainLayoutView');

    module.exports = Marionette.LayoutView.extend({
        template: headerTemplateHBS

    });


});