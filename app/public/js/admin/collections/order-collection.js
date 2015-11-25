define(function(require, exports, module){
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        baseUrl = require('baseUrl'),
        ordersResource = require('ordersResource'),
        ordersModel = require('ordersModel');


    module.exports = Backbone.Collection.extend({
        model: ordersModel,
        url: baseUrl+ordersResource,

        setGetUrl: function (weekModel) {
            this.url =  baseUrl+ordersResource+'?day=';

            weekModel.get('days').map(function (day) {
                this.url += day + ',';
            }.bind(this));
            this.url= this.url.substr(0,this.url.length-1);
        }
    });
});
