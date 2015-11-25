define(function(require, exports, module) {
    var Marionette = require('marionette'),
        Backbone = require ('backbone'),
        $ = require ('jquery'),
        UserView = require('userView'),
        emptyUserView = require('emptyUserView'),
        BackboneRadio = require('backboneRadio'),
        MainUserListView = require('hbs!user-list/view/templates/main-user-list-view');


    module.exports = Marionette.CompositeView.extend({
        template: MainUserListView,
        childView: UserView,
        childViewContainer: '#userList',
        childEvents:{
            'user:removed': 'userClickedM'
        },

        events: {
            'change #filter-name' :'changed',
            'click .js-add-new-user': 'addNewUser'
        },

        ui: {
          notification: '.js-notification'
        },


        initialize: function(){
           this.notifyScroll();
        },

        notifyScroll: function(){
                $(window).scroll(function() {
                    var top = $(document).scrollTop();
                    if (top > 346) {$('.js-notification').addClass('b-user-notification_fixed');}
                    else {$('.js-notification').removeClass('b-user-notification_fixed');}
                });
        },
        animateNotify: function(){
                var opacity = 1;

                function changeOpacity(){
                    opacity = opacity - 0.04;
                    $('.js-notification').css('opacity',opacity);
                    if (opacity < 0){
                        clearInterval(timer);
                        $('.js-notification').css('display','none');
                    }
                }
                var timer = setInterval(changeOpacity,20);
        },
        notifyParam: function(notification){
            this.model = new Backbone.Model (notification);
            this.render();
            this.ui.notification.addClass('b-user-notification_green').css('display','block');
            if ($(document).scrollTop() > 346) $('.js-notification').addClass('b-user-notification_fixed');
            setTimeout(this.animateNotify,5000);

        },

        onShow: function(){
            var userChannel = BackboneRadio.channel('user');
            userChannel.on('notification:add', function(notification) {
                    console.log(notification);
                    if (notification.type === 'PUT'){
                        notification.type = 'User information successful update!';
                        this.notifyParam(notification);
                    }
                    else if (notification.type === 'POST'){
                        notification.type = 'User successfully added!';
                        this.notifyParam(notification);
                    }
                    else if (notification.type === 'DELETE'){
                        notification.type = 'User successfully removed!';
                        this.notifyParam(notification);
                    }
                    else if (notification.type === 'GET'){}
                    else {
                        this.model = new Backbone.Model (notification);
                        this.render();
                        this.ui.notification.removeClass('b-user-notification_green').css('display','block');
                        if ($(document).scrollTop() > 346) $('.js-notification').addClass('b-user-notification_fixed');
                        setTimeout(this.animateNotify,5000);
                    }
                }.bind(this)

            );

        },

        getEmptyView: function() {
            return emptyUserView;
        },

        userClickedM: function (view, model) {
            var confirm_result = confirm('Are you sure you want to remove ' + model.get('firstName')+ ' ' + model.get('lastName') + ' from the system?');

            if (confirm_result === true) {
                model.setPutUrl();
                model.destroy();
            }
        },

        changed: function(evt) {
            this.trigger('filter:users:name:applied', evt.currentTarget.value);
        },

        addNewUser: function(){
            this.collection.unshift({'image_path': 'images/male.jpg', 'lastName':''});
            this.trigger('filter:users:name:applied', '');
            $('#filter-name').val('');
        }



    });


});