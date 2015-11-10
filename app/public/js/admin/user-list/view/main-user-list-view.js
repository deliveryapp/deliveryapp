define(function(require, exports, module) {
    var Marionette = require('marionette'),
        UserView = require('userView'),
        MainUserListView = require('hbs!user-list/view/templates/main-user-list-view');


    module.exports = Marionette.CompositeView.extend({
        template: MainUserListView,
        childView: UserView,
        childViewContainer: '#userList',
        childEvents:{
            'user:removed': 'userClickedM'
        },
        userClickedM: function (view, model) {
            this.collection.remove(model);
        }
    });


});