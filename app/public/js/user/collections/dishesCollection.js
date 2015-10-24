define(function(require, exports, module){
    var Backbone = require('backbone'),
        DishModel = require('dishModel');

    module.exports = Backbone.Collection.extend({
        model: DishModel,
        url: '../db/dishes.json'
    });

});
