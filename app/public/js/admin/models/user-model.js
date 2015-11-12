define(function(require, exports, module){
    var $ = require('jquery'),
        _ = require('underscore'),
        baseUrl = require('baseUrl'),
        usersResource = require('usersResource'),
        Backbone = require('backbone');


    module.exports  = Backbone.Model.extend({
        urlRoot: 'http://stark-eyrie-7510.herokuapp.com/users',
        idAttribute: '_id',
        url: function() {
            return this.urlRoot + '/' + this.get('_id');
        },
        defaults: {

        },
        initialize: function () {

        },
        //urlRoot: baseUrl+usersResource,
        url: function () {
            return baseUrl+usersResource;//+'/'+this.get('_id');
        },
        setPostUrl: function () {
            this.url = baseUrl+usersResource;
        },
        setPutUrl: function () {
            this.url = baseUrl+usersResource+'/'+this.get('_id');
        },
    });

});