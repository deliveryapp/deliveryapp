define(function (require, exports, module) {
    var Marionette = require('marionette'),
        template = require('hbs!../components/card/templates/card');

    module.exports = Marionette.LayoutView.extend({
        regions: {
            tabs: '#tabs',
            content: '#dishes-list'
        },
        template: template
    });
});