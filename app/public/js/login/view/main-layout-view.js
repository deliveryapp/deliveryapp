define(function(require, exports, module) {
    var Marionette = require('marionette'),
        headerTemplateHBS = require('hbs!view/templates/main-layout-view');

    module.exports = Marionette.LayoutView.extend({
        template: headerTemplateHBS,

        events: {
            'click #submit-login': 'aut'

        },

        ui: {
            loginInput : '#login-username',
            passInput: '#login-password'
        },

        aut: function(){
            this.user = {
                mail : $('#login-username').val(),
                password : $('#login-password').val()

            };


            $.ajax({
                method: 'POST',
                url: 'http://stark-eyrie-7510.herokuapp.com/login',
                data: this.user
            }).done(function () {
                location.href='user';
            });
        }




    });


});