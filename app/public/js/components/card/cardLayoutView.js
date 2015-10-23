define(function (require, exports, module) {
    var Marionette = require('marionette'),
        template = require('hbs!../components/card/templates/card');

    module.exports = Marionette.LayoutView.extend({
        regions: {
            tabs: '#tabs',
            content: '#dishes-list'
        },
        template: template,

        onShow: function () {
            var views = this.getOption('childViews');

            this.tabs.show(views.tabs);
            this.content.show(views.days);

            this.listenTo(views.tabs, 'all', function (eventName, attr) {

                this.trigger(eventName, attr);
            }.bind(this));
        }
    });
});