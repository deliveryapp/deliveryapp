define(function(require, exports, module){

    var Marionette = require('marionette'),
        UserDishCardView = require('userDishCardView'),
        template = require('hbs!menu/views/templates/dayMenuSelectionView');

    module.exports = Marionette.CompositeView.extend({

        template: template,
        childView: UserDishCardView,
        childViewContainer: '#user-day-menu',
        childEvents:{
            'dish:removed': 'dishClickedM'
        },
        dishClickedM: function (evt, model) {
            this.collection.remove(model);
        }
    });
});