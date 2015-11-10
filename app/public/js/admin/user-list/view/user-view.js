define(function(require, exports, module) {
    var Marionette = require('marionette'),
        UserView = require('hbs!user-list/view/templates/user-view');
    
    module.exports = Marionette.ItemView.extend({
        tagName: 'li',
        className: 'b-all-user__one-person',
        template: UserView,
        events: {
            'click .user-remove': 'userRemoved'
        },

        userRemoved: function () {
            this.trigger('user:removed', this.model);
        }
    });
});