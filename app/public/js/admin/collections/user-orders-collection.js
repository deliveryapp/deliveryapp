define(function(require, exports, module){
    var Backbone = require('backbone'),
        UserOrderModel = require('userOrderModel');

    module.exports = Backbone.Collection.extend({
        model: UserOrderModel,
        url: '../db/test/orders.json'

    });

});
