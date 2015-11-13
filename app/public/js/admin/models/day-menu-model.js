define(function(require, exports, module){
    var $ = require('jquery'),
        _ = require('underscore'),
        baseUrl = require('baseUrl'),
        daysResource = require('daysResource'),
        Backbone = require('backbone');


    module.exports  = Backbone.Model.extend({
        defaults: {
        },
        idAttribute: '_id',
        url: baseUrl+daysResource,
        setPostUrl: function () {
            this.url =  baseUrl+daysResource;
        },
        setPutUrl: function () {
            this.url =  baseUrl+daysResource+'?day='+this.get('day');
        }
    });

});