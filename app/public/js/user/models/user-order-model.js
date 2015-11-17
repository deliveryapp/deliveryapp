define(function(require, exports, module){
    var Backbone = require('backbone'),
        baseUrl = require('baseUrl'),
        ordersResource = require('ordersResource');

    module.exports  = Backbone.Model.extend({
        defaults: {
        },
        idAttribute: '_id',
        restDate: null,
        initialize: function () {
            this.restDate = this.get('day');
            this.set('day', new Date(this.restDate).toDateString());
        },
        setVisibleDate: function () {
            this.set('day', new Date(this.restDate).toDateString());
        },
        setRestDate: function () {
            this.set('day', this.restDate);
        },
        url: baseUrl+ordersResource,
        setPostUrl: function () {
            this.url =  baseUrl+ordersResource;
        },
        setPutUrl: function (userId, days) {
            this.url =  baseUrl+ordersResource;/*+ '/' + userId + '?day=';
            days.map(function (day) {
                this.url += day + ',';
            }.bind(this));*/
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