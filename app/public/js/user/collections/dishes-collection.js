define(function(require, exports, module){
    var _ = require('underscore'),
        Backbone = require('backbone'),
        baseUrl = require('baseUrl'),
        dishesResource = require('dishesResource'),
        DishModel = require('dishModel');

    module.exports = Backbone.Collection.extend({
        model: DishModel,
        url: baseUrl+dishesResource,
        calculateSummary: function() {
            var sum = 0;
            this.map(function (model) {
                var dish = model.get('dish');
                var quantity = model.get('quantity');
                sum += dish.price * quantity;

            }.bind(this));
            return sum;
        }
    });

});
