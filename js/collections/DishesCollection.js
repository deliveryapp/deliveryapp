define(function(require, exports, module){
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        DishModel = require('DishModel');


    module.exports = Backbone.Collection.extend({
        model: DishModel,
        url: 'http://localhost:63342/deliveryapp/db/dishes.json'
    });

});
