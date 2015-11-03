define(function(require, exports, module){
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        UserModel = require('UserModel');


    module.exports = Backbone.Collection.extend({
        model: UserModel,
        url: '../db/users.json'
    });

});
