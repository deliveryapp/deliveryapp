define(function(require, exports, module){
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        UserDayMenuModel = require('UserDayMenuModel');


    module.exports = Backbone.Collection.extend({
        model: UserDayMenuModel,
        url: '../db/user.json'
    });

});
