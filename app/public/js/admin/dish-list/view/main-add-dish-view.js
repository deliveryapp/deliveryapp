define(function(require, exports, module) {
    var Marionette = require('marionette'),
        MainAddDishView = require('hbs!add-dish/view/templates/main-add-dish-view');

    module.exports = Marionette.LayoutView.extend({
        template: MainAddDishView,
        events: {
            'click .js-button-dish-add': 'dishAdded'
        },
        dishAdded: function () {
            var dishInfo = {
                name: this.ui.name[0].value,
                price: this.ui.price[0].value,
                weight: this.ui.weight[0].value,
                image_path: this.ui.image_path[0].value,
                category: this.ui.category[0].value,
                description: this.ui.description[0].value
            };
            console.log(dishInfo);
            this.trigger('dish:item:added',dishInfo);
            this.clearInpunts();
        },
        clearInpunts: function () {
            this.ui.name[0].value = '';
            this.ui.price[0].value = '';
            this.ui.weight[0].value = '';
            this.ui.image_path[0].value = '';
            this.ui.category[0].value = '';
            this.ui.description[0].value = '';
        },
        ui: {
            name: '#name',
            price: '#price',
            weight: '#weight',
            image_path: '#image_path',
            category: '#category',
            description: '#description'
        }

    });


});