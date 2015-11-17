define(function(require, exports, module){
    var _ = require('underscore'),
        Backbone = require('backbone'),
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
            this.url =  'http://localhost/orders/'+userId+'/'+this.get('_id');
                //+ userId + '?day=' + this.get('day');
                /*baseUrl+ordersResource;*//*+ '/' + userId + '?day=';
            days.map(function (day) {
                this.url += day + ',';
            }.bind(this));*/
        }
    });

});