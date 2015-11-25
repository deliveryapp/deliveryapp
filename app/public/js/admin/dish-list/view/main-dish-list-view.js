define(function(require, exports, module) {
    var Marionette = require('marionette'),
        DishView = require('dishView'),
        emptyDishView = require('emptyDishView'),
        BackboneRadio = require('backboneRadio'),
        MainDishListView = require('hbs!dish-list/view/templates/main-dish-list-view');


    module.exports = Marionette.CompositeView.extend({
        template: MainDishListView,
        childView: DishView,
        childViewContainer: '#userList',
        childEvents:{
            'dish:removed': 'userClickedM'
        },

        events: {
            'change #filter-name' :'changed',
            'click .js-add-new-dish': 'addNewUser'

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


        onDestroy: function(){
            this.userChannel.reset();
        },

        onShow: function(){
            this.userChannel = BackboneRadio.channel('user');
            this.userChannel.on('notification:add', function(notification) {
                    if (notification.type.toLowerCase() === 'put'){
                        notification.type = 'Dish information successful update!';
                        this.notifyParam(notification);
                    }
                    else if (notification.type.toLowerCase() === 'post'){
                        notification.type = 'Dish successfully added!';
                        this.notifyParam(notification);
                    }
                    else if (notification.type.toLowerCase() === 'delete'){
                        notification.type = 'Dish successfully removed!';
                        this.notifyParam(notification);
                    }
                    else if (notification.type.toLowerCase() === 'get'){}
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
            return emptyDishView;
        },

        userClickedM: function (view, model) {
            var confirm_result = confirm('Are you sure you want to remove ' + model.get('name') +  ' from the system?');
            if (confirm_result === true) {
                model.setPutUrl();
                model.destroy();
            }

        },

        changed: function(evt) {
            this.trigger('filter:dishes:name:applied', evt.currentTarget.value);
        },

        addNewUser: function(){

            this.collection.unshift({'image_path': 'images/soup_icon.png', 'name':''});
            this.trigger('filter:dishes:name:applied', '');
            $('#filter-name').val('');

        }



    });


});