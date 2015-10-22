define(function(require, exports, module){

    var Marionette = require('marionette'),
        UserDishCardView = require('UserDishCardView'),
        template = require('hbs!menu/views/templates/DayMenuSelectionView');

    module.exports = Marionette.CompositeView.extend({

        template: template,
        childView: UserDishCardView,
        childViewContainer: '#user-day-menu',
        childEvents:{
            'dishRemoved': 'dishClickedM'
        },
        dishClickedM: function (evt, model) {
            this.collection.remove(model);
        }
    });
});