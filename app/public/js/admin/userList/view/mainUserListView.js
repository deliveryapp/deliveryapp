define(function(require, exports, module) {
    var Marionette = require('marionette'),
        UserView = require('userView'),
        MainUserListView = require('hbs!userList/view/templates/mainUserListView');


    module.exports = Marionette.CompositeView.extend({
        template: MainUserListView,
        childView: UserView,
        childViewContainer: '#userList',
        childEvents:{
            'user:removed': 'userClickedM'
        },
        userClickedM: function (evt, model) {
            this.collection.remove(model);
        }
    });


});