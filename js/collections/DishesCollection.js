define(function(require, module, exports){
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        DishModel = require('DishModel');


    module.exports = Backbone.Collection.extend({
        model: DishModel,
        url: '../../db/dishes.json'
    });

});
