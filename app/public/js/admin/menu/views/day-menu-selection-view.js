define(function(require, exports, module){

    var Marionette = require('marionette'),
        AdminDishCardView = require('adminDishCardView'),
        AdminDishCardEmpty = require('adminDishCardEmpty'),
        template = require('hbs!menu/views/templates/day-menu-selection-view');

    module.exports = Marionette.CompositeView.extend({

        template: template,
        childView: AdminDishCardView,
        emptyView: AdminDishCardEmpty,
        childEvents:{
            'dish:removed': 'dishClickedM'
        },
        dishClickedM: function (view, model) {
            this.collection.remove(model);
        }
    });
});