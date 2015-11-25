define(function(require, exports, module){

    var Marionette = require('marionette'),
        UserDishCardView = require('userDishCardView'),
        UserDishCardEmpty = require('userDishCardEmpty'),
        BackboneRadio = require('backboneRadio'),
        template = require('hbs!menu/views/templates/day-menu-selection-view');

    module.exports = Marionette.CompositeView.extend({

        template: template,
        childView: UserDishCardView,
        emptyView: UserDishCardEmpty,
        childViewContainer: '.js-selected-day-menu',
        childEvents:{
            'dish:removed': 'dishRemoved',
            'quantity:minus': 'quantityUpdated',
            'quantity:plus': 'quantityUpdated'
        },
        events: {
            'click .js-button-icon-save-day-menu': 'saveDayMenu'
        },
        ui: {
            notification: '.js-menu-notification'
        },
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.notifyScroll();
        },
        notifyScroll: function(){
            $(window).scroll(function() {
                var top = $(document).scrollTop();
                if (top > 346) {$('.js-menu-notification').addClass('b-menu-notification_fixed');}
                else {$('.js-menu-notification').removeClass('b-menu-notification_fixed');}
            });
        },
        animateNotify: function(){
            var opacity = 1;

            function changeOpacity(){
                opacity = opacity - 0.04;
                $('.js-menu-notification').css('opacity',opacity);
                if (opacity < 0){
                    clearInterval(timer);
                    $('.js-menu-notification').css('display','none');
                }
            }
            var timer = setInterval(changeOpacity,20);
        },
        notifyParam: function(notification){
            this.model = new Backbone.Model (notification);

            this.render();
            this.ui.notification.addClass('b-menu-notification_green').css('display','block');
            if ($(document).scrollTop() > 346) $('.js-menu-notification').addClass('b-menu-notification_fixed');
            setTimeout(this.animateNotify,5000);

        },
        onRender: function(){
            this.userChannel = BackboneRadio.channel('user');
            this.userChannel.on('notification:add', function(notification) {
                    //debugger;
                    console.log(notification);
                    if (notification.type.toLowerCase() === 'put'){
                        notification.type = 'Your day menu successfully updated!';
                        this.notifyParam(notification);
                    }
                    else if (notification.type === 'GET'){}

                }.bind(this)

            );

        },
        onDestroy: function () {
            this.userChannel.reset();
        },
        saveDayMenu: function () {
            this.trigger('user:day:menu:saved',this.collection);
        },
        dishRemoved: function (view, model) {
            this.collection.remove(model);
            this.updateSummary();
            this.trigger('day:menu:dish:removed', model);
        },
        quantityUpdated: function (view) {
            //debugger;
            this.updateSummary();
        },
        setModel: function (model) {
            this.listenTo(this.model, 'change', this.render);
            //this.model.set('summary', model.get('summary'));
        },
        updateSummary: function () {
            this.model.set('summary', this.collection.calculateSummary());
            this.render();
        }

        /*initialize: function () {
            this.model.set('summary', this.collection.getSu
        }*/
    });
});