define(function (require, exports, module) {
    var Marionette = require('marionette'),
        template = require('hbs!./templates/card');

    module.exports = Marionette.LayoutView.extend({
        regions: {
            tabs: '#tabs',
            content: '#dishes-list'
        },
        template: template
    });
});