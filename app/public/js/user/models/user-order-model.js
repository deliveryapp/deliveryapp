define(function(require, exports, module){
    var Backbone = require('backbone'),
        baseUrl = require('baseUrl'),
        ordersResource = require('ordersResource');

    module.exports  = Backbone.Model.extend({
        defaults: {
        },
        postUrl: function () {
            this.url = baseUrl+ordersResource;
        },
        putUrl: function () {
            this.url = baseUrl+ordersResource+'';
        },
        calculateSummary: function() {
            var dishes = this.get('dishes');
            debugger;
            var res = dishes.reduce(function(orderSummary, item){
                return orderSummary + item.get('price');
            }, 0);
            return res;
        }
    });

});