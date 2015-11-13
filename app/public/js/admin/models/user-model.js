define(function(require, exports, module){
    var $ = require('jquery'),
        _ = require('underscore'),
        baseUrl = require('baseUrl'),
        usersResource = require('usersResource'),
        Backbone = require('backbone');


    module.exports  = Backbone.Model.extend({
        idAttribute: '_id',
        url: function () {
            return baseUrl+usersResource;//+'/'+this.get('_id');
        },
        setPostUrl: function () {
            this.url = baseUrl+usersResource;
        },
        setPutUrl: function () {
            this.url = baseUrl+usersResource+'/'+this.get('_id');
        }
    });

});