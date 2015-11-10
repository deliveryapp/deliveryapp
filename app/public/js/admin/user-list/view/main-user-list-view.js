define(function(require, exports, module) {
    var Marionette = require('marionette'),
        UserView = require('userView'),
        emptyUserView = require('emptyUserView'),
        MainUserListView = require('hbs!user-list/view/templates/main-user-list-view');


    module.exports = Marionette.CompositeView.extend({
        template: MainUserListView,
        childView: UserView,
        childViewContainer: '#userList',
        childEvents:{
            'user:removed': 'userClickedM'
        },

        events: {
            'change input' :'changed'
        },

        getEmptyView: function() {
            return emptyUserView;
        },

        userClickedM: function (view, model) {
            var confirm_result = confirm('Are you sure you want to remove ' + model.get('firstName')+ ' ' + model.get('lastName') + ' from the system?');

            if (confirm_result === true) {
                this.collection.remove(model);
            }
        },

        changed: function(evt) {
            this.trigger('filter:users:name:applied', evt.currentTarget.value);
        }


    });


});