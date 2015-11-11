define(function(require, exports, module) {
    var Marionette = require('marionette'),
        UserViewEdit=require('hbs!user-list/view/templates/user-view-edit'),
        UserView = require('hbs!user-list/view/templates/user-view');
    
    module.exports = Marionette.ItemView.extend({
        tagName: 'li',
        className: 'b-all-user__one-person',
        template: UserView,
        events: {
            'click .user-remove': 'userRemoved',
            'click .user-edit': 'userEdit'
        },

        ui: {
            firstName: '#user-first-name',
            lastName: '#user-last-name',
            userRole: '#user-role',
            userMail: '#user-mail'

         },

        userRemoved: function () {
            this.trigger('user:removed', this.model);
        },
        userEdit: function(){

            if (this.model.get('contentEditable') === undefined){
                this.model.set('contentEditable','contentEditable');
                this.template = UserViewEdit;
                this.render();

            }
            else{
                this.model.unset('contentEditable','silent');
                this.template = UserView;
                this.model.set('firstName', this.ui.firstName.val());
                this.model.set('lastName', this.ui.lastName.val());
                this.model.set('Role',this.ui.userRole.val());
                this.model.set('mail',this.ui.userMail.val());
                this.render();
            }


        }
    });
});
