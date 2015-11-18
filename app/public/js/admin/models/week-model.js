define(function(require, exports, module){
    var $ = require('jquery'),
        _ = require('underscore'),
        baseUrl = require('baseUrl'),
        weeksResource = require('weeksResource'),
        Backbone = require('backbone');


    module.exports  = Backbone.Model.extend({
        idAttribute: '_id',
        url: baseUrl+weeksResource,
        setNextWeekUrl: function () {
            this.url = baseUrl+weeksResource+'/next';
        },
        setCurrentWeekUrl: function () {
            this.url = baseUrl+weeksResource+'/current';
        },
        setPostUrl: function () {
            this.url = baseUrl+weeksResource+'?startDate=';
            //debugger;
        }
    });

});