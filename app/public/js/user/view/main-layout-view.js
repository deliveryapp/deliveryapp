define(function(require, exports, module) {
    var Marionette = require('marionette'),
        headerTemplateHBS = require('hbs!view/templates/main-layout-view');

    module.exports = Marionette.LayoutView.extend({
        template: headerTemplateHBS

    });
});