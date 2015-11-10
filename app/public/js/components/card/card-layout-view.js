define(function (require, exports, module) {
    var Marionette = require('marionette'),
        template = require('hbs!../components/card/templates/card-layout-view');

    module.exports = Marionette.LayoutView.extend({
        regions: {
            tabs: '.js-card-main__tabs',
            content: '.js-card',
            dayMenu: '.js-user-menu-card__menu'
        },
        template: template,

        onShow: function () {
            var views = this.getOption('childViews');

            this.tabs.show(views.tabs);
            this.content.show(views.days);
            this.dayMenu.show(views.dayMenu);

            this.listenTo(views.tabs, 'all', function (eventName, attr) {
                this.trigger(eventName, attr);
            }.bind(this));
        }
    });
});