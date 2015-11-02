define(function(require, exports, module){
    var Backbone = require('backbone'),
        UserDayMenuModel = require('userDayMenuModel');

    module.exports = Backbone.Collection.extend({
        model: UserDayMenuModel,
        url: '../db/user.json'
    });

});