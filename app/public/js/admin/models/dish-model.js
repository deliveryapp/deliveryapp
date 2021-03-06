define(function(require, exports, module){
    var $ = require('jquery'),
        _ = require('underscore'),
        baseUrl = require('baseUrl'),
        dishesResource = require('dishesResource'),
        DishListCategory = require('dishListCategory'),
        Backbone = require('backbone');


    module.exports  = Backbone.Model.extend({
        urlRoot: baseUrl+dishesResource,
        idAttribute: '_id',
                setPostUrl: function () {
            this.url = baseUrl+dishesResource;
        },
        setPutUrl: function () {
            this.url = baseUrl+dishesResource+'/'+this.get('_id');
        },
        defaults: {
            categoryList: DishListCategory()
        }
    });

});
