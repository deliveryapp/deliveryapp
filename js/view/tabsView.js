define(function (require) {
    var Marionette = require('marionette'),
        Tmpl = require('hbs!templates/tabs');

    return Marionette.ItemView.extend({
        tagName: 'div',

        template: Tmpl,
        initialize: function() {
              console.log(this.model);
        }
    });
});