define(function(require, exports, module){

    var Marionette = require('marionette'),
        UserDishCardView = require('userDishCardView'),
        UserDishCardEmpty = require('userDishCardEmpty'),
        template = require('hbs!menu/views/templates/day-menu-selection-view');

    module.exports = Marionette.CompositeView.extend({

        template: template,
        childView: UserDishCardView,
        emptyView: UserDishCardEmpty,
        childEvents:{
            'dish:removed': 'dishClickedM'
        },
        dishClickedM: function (view, model) {
            this.collection.remove(model);
        }
    });
});