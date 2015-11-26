define(function(require, exports, module){
    var Backbone = require('backbone'),
        DishListCategory = require('dishListCategory');

    module.exports  = Backbone.Model.extend({
        defaults: {
            categoryList: DishListCategory()
        }
    });

});
