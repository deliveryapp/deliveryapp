define(function (require, exports, module) {
    var Marionette = require('marionette'),
        Tmpl = require('hbs!../components/tabs/templates/tab-item-view');

    module.exports =  Marionette.ItemView.extend({
        tagName: 'a',
        className : 'b-button-tab',
        id: function () {
            return this.model.get('day');
        },

        initialize: function () {
            var date = new Date(this.model.get('day'));
            this.model.set('day', date.toDateString());
        },

        template: Tmpl,

        events: {
            'click': 'pressDay'
        },

        pressDay: function () {
            this.model.set('className', 'active');
            //this.model.set("className", "b-button-tab_selected");
            this.trigger('choosing', this.model.get('status'));
        }
    });
});