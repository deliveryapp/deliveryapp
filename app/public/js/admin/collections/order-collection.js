define(function(require, exports, module){
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        baseUrl = require('baseUrl'),
        ordersResource = require('ordersResource'),
        ordersModel = require('ordersModel');


    module.exports = Backbone.Collection.extend({
        model: ordersModel,
        url: baseUrl+ordersResource
    });


});
