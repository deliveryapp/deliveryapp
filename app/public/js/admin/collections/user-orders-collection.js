define(function(require, exports, module){
    var Backbone = require('backbone'),
        baseUrl = require('baseUrl'),
        ordersResource = require('ordersResource'),
        UserOrderModel = require('userOrderModel');

    module.exports = Backbone.Collection.extend({
        model: UserOrderModel,
        idAttribute: '_id',
        restDate: null,
        /*setUrl: function (userId, days) {
            this.url = baseUrl + ordersResource + '/' + userId + '?day=';
            days.map(function (day) {
                this.url += day + ',';
            });
        },*/
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
            this.url =  baseUrl+ordersResource+'?day='+ '/' + userId + '?day=';
            days.map(function (day) {
                this.url += day + ',';
            }.bind(this));
        }

    });

});
