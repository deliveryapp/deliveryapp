define(function (require, exports, module) {
    var Marionette = require('marionette'),
        Tmpl = require('hbs!../components/tabs/templates/tab');

    module.exports =  Marionette.ItemView.extend({
        tagName: 'a',
        className : 'btn-small btn col s2 orange darken-1',
        id: function () {
            return this.model.get('name');
        },
        attributes: {
            'href' : '#'
        },
        template: Tmpl,
        initialize: function() {
            console.log(this.model);
        }
    });
});