define(function(require, exports, module) {
    var Marionette = require('marionette'),
        UserViewEdit=require('hbs!user-list/view/templates/user-view-edit'),
        UserView = require('hbs!user-list/view/templates/user-view');
    
    module.exports = Marionette.ItemView.extend({
        tagName: 'li',
        className: 'b-all-user__one-person',
        template: UserView,
        events: {
            'click .js-user-remove': 'userRemoved',
            'click .js-user-edit': 'userEdit',
            'click .js-user-edit-save': 'userEditSave',
            'click .js-user-not-edit': 'notEdit'
        },

        ui: {
            firstName: '#user-first-name',
            lastName: '#user-last-name',
            userRole: '#user-role',
            userMail: '#user-mail',
            userPass: '#user-password'
         },

        initialize: function() {
            if (this.model.get('_id') === undefined && this.model.get('role') === undefined || this.model.get('valid') === 'error'){
                this.template = UserViewEdit;
                this.model.set('valid','');
            }
        },
        onShow: function(){
            $('.js-password-input').removeAttr('hidden');
        },

        userRemoved: function () {
            this.trigger('user:removed', this.model);
        },


        userEdit: function(){
                this.template = UserViewEdit;
                this.render();

        },
        userEditSave: function(){
            this.model.set('firstName', this.ui.firstName.val());
            this.model.set('lastName', this.ui.lastName.val());
            this.model.set('role', this.ui.userRole.val());
            this.model.set('mail', this.ui.userMail.val());

            if (this.model.get('_id') === undefined ){
                this.model.set('password',this.ui.userPass.val());
                this.model.setPostUrl();
            }
            else{
                this.model.setPutUrl();
            }

            this.model.save(null,{success: function(){
                this.template = UserView;
                this.render();
               }.bind(this),
            error: function(model,xhr ){
               this.model.set('valid','error');
            }.bind(this)
            });

        },

        notEdit: function () {
            if (this.model.get('_id') === undefined){
                this.model.destroy();
            }
            else {
                this.template = UserView;
                this.render();
            }
        }
    });
});
