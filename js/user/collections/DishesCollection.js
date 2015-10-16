define(function(require, exports, module){
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        DishModel = require('DishModel');


    module.exports = Backbone.Collection.extend({
        model: DishModel,
        url: '../deliveryapp/db/dishes.json'
    });

});
