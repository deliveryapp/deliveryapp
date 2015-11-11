define(function(require, exports, module){
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone');


    module.exports  = Backbone.Model.extend({
        urlRoot: 'http://stark-eyrie-7510.herokuapp.com/dishes',
        url: function() {
            return this.urlRoot + '?id=' + this.id;
        },
        defaults: {
        }
    });

});
