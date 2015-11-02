define(function(require, exports, module){

    var Marionette = require('marionette'),
        template = require('hbs!../components/dishCard/templates/dishCardView');

    module.exports = Marionette.ItemView.extend({
        template: template,
        events: {
            'change input': 'changed'
        },

        changed:function(evt) {
            console.log(evt.currentTarget.value);
            this.trigger('input:changed', evt.currentTarget.value);
        },
        initialize: function () {

        }
    });
});