define(function(require, exports, module) {
    var Marionette = require('marionette'),
        EmptyUserView = require('hbs!user-list/view/templates/empty-user-view');
    
    module.exports = Marionette.ItemView.extend({
        template: EmptyUserView,
        className: 'b-personal-info b-user-list_empty-list'

    });
});
