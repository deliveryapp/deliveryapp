define(function(require, exports, module){
    var Backbone = require('backbone'),
        moment = require('moment'),
        baseUrl = require('baseUrl'),
        ordersResource = require('ordersResource');

    module.exports  = Backbone.Model.extend({
        url: baseUrl+ordersResource,
        idAttribute: '_id',
        restDate: null,
        defaults: {

        },
        initialize: function () {
            this.restDate = this.get('day');
        },
        setVisibleDate: function () {
            this.set('day', new Date(this.restDate).toDateString());
        },
        setRestDate: function () {
            this.set('day', this.restDate);
        },
        work : function() {
           return moment(this.get('day')).format('DD MMMM YYYY')
        },
        setPutUrl: function(userId){
            this.url = baseUrl+ordersResource+'/'+userId+'/'+this.get('_id');
        }
    });
});