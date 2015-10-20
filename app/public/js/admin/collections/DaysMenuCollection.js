define(function(require, exports, module){
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        DayMenuModel = require('DayMenuModel');


    module.exports = Backbone.Collection.extend({
        model: DayMenuModel,
        url: '../db/days.json'
    });

});
