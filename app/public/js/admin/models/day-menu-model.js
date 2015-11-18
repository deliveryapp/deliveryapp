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
        restDate: null,
        initialize: function () {
            this.restDate = this.get('day');
            this.set('day', new Date(this.restDate).toDateString());
        },
        setVisibleDate: function () {
            this.set('day', new Date(this.restDate).toDateString());
        },
        setRestDate: function () {
            this.set('day', this.restDate);
        },
        url: baseUrl+daysResource,
        setPostUrl: function () {
            this.url =  baseUrl+daysResource;
        },
        setPutUrl: function () {
            this.url =  baseUrl+daysResource+'/'+this.get('_id')+"?day="+this.get('day');//'/'+this.get('_id') delete
        }

    });

});