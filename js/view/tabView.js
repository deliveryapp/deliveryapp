define(function (require) {
    var Marionette = require('marionette'),
        Tmpl = require('hbs!templates/tabs');

    return Marionette.ItemView.extend({
        tagName: 'a',
        id: function () {
            return this.model.get('name')
        },
        attributes: {
            "href": "#"
        },
        template: Tmpl,
        initialize: function() {
              console.log(this.model);
        },
        onRender: function(){

            //$('ul.tabs').tabs();

        }
    });
});