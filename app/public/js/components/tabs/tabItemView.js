define(function (require, exports, module) {
    var Marionette = require('marionette'),
        Tmpl = require('hbs!../components/tabs/templates/tab');

    module.exports =  Marionette.ItemView.extend({
        tagName: 'a',
        className : 'btn-small btn col s2 orange darken-1',
        id: function () {
            return this.model.get('day');
        },

        template: Tmpl,

        events: {
            "click": "pressDay"
        },

        pressDay: function () {
            this.model.set("className", "active");
            this.trigger("choosing", this.model.get('status'));
        }
    });
});