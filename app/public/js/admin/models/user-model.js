define(function(require, exports, module){
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone');


    module.exports  = Backbone.Model.extend({
        urlRoot: 'http://stark-eyrie-7510.herokuapp.com/users',
        idAttribute: '_id',
        url: function() {
            return this.urlRoot + '/' + this.get('_id');
        },
        defaults: {
        }
    });

});