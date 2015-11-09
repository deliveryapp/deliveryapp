define(function(require, exports, module) {
    var Marionette = require('marionette'),
        headerTemplateHBS = require('hbs!view/templates/navigationMenuLayoutView');

    module.exports = Marionette.LayoutView.extend({
        template: headerTemplateHBS

    });


});