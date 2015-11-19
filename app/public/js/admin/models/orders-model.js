define(function(require, exports, module){
    var Backbone = require('backbone'),
        moment = require('moment'),
        baseUrl = require('baseUrl'),
        ordersResource = require('ordersResource');

    module.exports  = Backbone.Model.extend({
        url: baseUrl+ordersResource,
        idAttribute: '_id',
        defaults: {

        },
        work : function() {
           return moment(this.get('day')).format('DD MMMM YYYY')
        },
        initialize: function() {
        },
        setPutUrl: function(userId){
            this.url = baseUrl+ordersResource+'/'+userId+'/'+this.get('_id');
        }
    });
});