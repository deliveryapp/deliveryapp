define(function(require, exports, module){
    var Backbone = require('backbone'),
        DayMenuModel = require('DayMenuModel');


    module.exports = Backbone.Collection.extend({
        model: DayMenuModel,
        url: '../db/days.json'
    });

});
