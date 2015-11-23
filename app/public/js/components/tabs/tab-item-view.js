define(function (require, exports, module) {
    var Marionette = require('marionette'),
        Tmpl = require('hbs!../components/tabs/templates/tab-item-view');

    module.exports =  Marionette.ItemView.extend({
        /*tagName: 'button',
        className : function () {
            return 'b-button-tab '+this.model.get('className');
        },
        id: function () {
            return this.model.get('day');
        },*/
        onRender: function () {
            // Get rid of that pesky wrapping-div.
            // Assumes 1 child element present in template.
            this.$el = this.$el.children();
            // Unwrap the element to prevent infinitely
            // nesting elements during re-render.
            this.$el.unwrap();
            this.setElement(this.$el);
        },

        initialize: function () {

        },

        template: Tmpl,

        events: {
            'click': 'pressDay'
        },

        pressDay: function () {

            //this.model.set("className", "b-button-tab_selected");
            this.trigger('choosing', this);
        }
    });
});