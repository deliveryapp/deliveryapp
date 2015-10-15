define(function (require) {
    var Marionette = require('marionette'),
        Tmpl = require('hbs!templates/tabs');

    return Marionette.ItemView.extend({
        tagName: 'div',
        className: function () {
            return this.model.get('className');
        },
        id: function () {
            return this.model.get('status')
        },
        template: Tmpl
    });
});