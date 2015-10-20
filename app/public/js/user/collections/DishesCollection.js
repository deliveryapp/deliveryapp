define(function(require, exports, module){
    var Backbone = require('backbone'),
        DishModel = require('DishModel');

    module.exports = Backbone.Collection.extend({
        model: DishModel,
        url: '../db/dishes.json'
    });

});
