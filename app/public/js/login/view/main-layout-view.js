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
                url: '/login/',
                data: JSON.stringify(this.user),
                dataType: 'json',
                contentType: 'application/json'
            }).done(function (role) {
                console.log(role);
                location.href='user';
            });
        }
    });


});