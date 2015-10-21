define(function(require, exports, module) {
    var Marionette = require('marionette'),
        template = require('hbs!menu/views/templates/MenuPreselectionView');

    module.exports = Marionette.LayoutView.extend({
        template: template,
        regions: {
            'selectedUserMenu': '#selected-user-menu',
            'dayMenu': '#day-menu'
        }
    });


});