define(function (require, exports, module) {
    var Marionette = require('marionette'),
        Tmpl = require('hbs!./templates/card');

    module.exports = Marionette.LayoutView.extend({

        regions: {
            menu: '#menu',
            tabs: '#tabs',
            content: '#dishes-list'
        },
        template: Tmpl,

        initialize: function() {

        },
        onRender: function () {

        }
    });
});