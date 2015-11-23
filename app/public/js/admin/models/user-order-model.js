define(function(require, exports, module){
    var Backbone = require('backbone');

    module.exports  = Backbone.Model.extend({
        defaults: {
        },
        calculateSummary: function() {
            var dishes = this.get('dishes');
            var res = dishes.reduce(function(orderSummary, item){
                return orderSummary + item.get('price');
            }, 0);
            return res;
        }
    });

});