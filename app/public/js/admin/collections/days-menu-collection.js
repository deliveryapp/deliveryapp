define(function(require, exports, module){
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        baseUrl = require('baseUrl'),
        daysResource = require('daysResource'),
        DayMenuModel = require('dayMenuModel');


    module.exports = Backbone.Collection.extend({
        model: DayMenuModel,
        url: baseUrl+daysResource
    });

});
