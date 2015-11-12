define(function(require, exports, module){
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        baseUrl = require('baseUrl'),
        usersResource = require('usersResource'),
        UserModel = require('userModel');


    module.exports = Backbone.Collection.extend({
        model: UserModel,
        url: baseUrl+usersResource,
        save: function () {
            Backbone.sync('create', this, {
                success: function(data) {
                    console.log(data);
                }
            });
        }
    });

});
