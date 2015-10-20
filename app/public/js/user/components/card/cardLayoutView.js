define(function (require, exports, module) {
    var Marionette = require('marionette'),
        Tmpl = require('hbs!./templates/card');

    module.exports = Marionette.LayoutView.extend({

        regions: {
            menu: '#menu',
            content: '#content'
        },
        template: Tmpl,

        initialize: function() {
            console.log(this.model);
        }

    });
});