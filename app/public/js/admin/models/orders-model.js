define(function(require, exports, module){
    var Backbone = require('backbone'),
        moment = require('moment')
        ;

    module.exports  = Backbone.Model.extend({
        defaults: {

        },
        work : function() {
           return moment(this.get('day')).format('DD MMMM YYYY')
        },
        initialize: function() {
        },
    });
});