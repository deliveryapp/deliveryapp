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
            this.url =  'http://localhost/orders/'+ userId + '?day=' + this.get('day');/* + '?day=';
            days.map(function (day) {
                this.url += day + ',';
            }.bind(this));*/
            debugger;
        }
    });

});