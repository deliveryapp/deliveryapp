define(function(require, exports, module){
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        baseUrl = require('baseUrl'),
        daysResource = require('daysResource'),
        DayMenuModel = require('dayMenuModel');


    module.exports = Backbone.Collection.extend({
        model: DayMenuModel,
        setUrl: function (weekModel) {
            this.url = baseUrl+daysResource+'?day=';
            weekModel.get('days').map(function (day) {
                this.url += day + ',';
            }.bind(this));
            this.url = this.url.slice(0, -1);
            //debugger;
        }
    });

});
