define(function(require, exports, module){
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        baseUrl = require('baseUrl'),
        dishesUrl = require('dishesResource'),
        DishModel = require('dishModel');


    module.exports = Backbone.Collection.extend({
        model: DishModel,
        url: baseUrl+dishesUrl
    });

});
