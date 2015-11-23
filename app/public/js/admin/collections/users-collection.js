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

        setGetUrl: function (users) {
            this.url =  baseUrl+usersResource+'?id=';
            users.map(function (users) {
                this.url += users + ',';
            }.bind(this));
            this.url= this.url.substr(0,this.url.length-1);
        }


    });

});
