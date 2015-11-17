define(function(require, exports, module){
    var Backbone = require('backbone'),
        baseUrl = require('baseUrl'),
        ordersResource = require('ordersResource'),
        UserOrderModel = require('userOrderModel');

    module.exports = Backbone.Collection.extend({
        model: UserOrderModel,
        //url: '../db/test/orders.json'
        setUrl: function (weekModel, userId) {
            this.url = baseUrl+ordersResource+'/'+userId+'?day=';
            weekModel.get('days').map(function (day) {
                this.url += day + ',';
            }.bind(this));
            console.log(this.url);
        }
    });

});
