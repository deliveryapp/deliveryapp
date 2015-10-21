define(function(require, exports, module){

    var Marionette = require('marionette'),
        DishCardView = require('DishCardView'),
        template = require('hbs!menu/views/templates/DayMenuSelectionView');

    module.exports = Marionette.CollectionView.extend({

        template: template,
        childView: DishCardView,

        initialize: function () {

        }
    });
});