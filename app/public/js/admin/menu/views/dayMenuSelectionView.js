define(function(require, exports, module){

    var Marionette = require('marionette'),
        UserDishCardView = require('userDishCardView'),
        template = require('hbs!menu/views/templates/dayMenuSelectionView');

    module.exports = Marionette.CompositeView.extend({

        template: template,
        childView: UserDishCardView,

        childEvents:{
            'dish:removed': 'dishClickedM'
        },
        dishClickedM: function (view, model) {
            this.collection.remove(model);
        }
    });
});