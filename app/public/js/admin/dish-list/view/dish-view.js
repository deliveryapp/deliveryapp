define(function(require, exports, module) {
    var Marionette = require('marionette'),
        DishViewEdit=require('hbs!dish-list/view/templates/dish-view-edit'),
        DishView = require('hbs!dish-list/view/templates/dish-view');
    
    module.exports = Marionette.ItemView.extend({
        tagName: 'li',
        className: 'b-all-user__one-person',
        template: DishView,
        events: {
            'click .dish-remove': 'dishRemoved',
            'click .dish-edit': 'dishEdit',
            'click .js-dish-not-edit': 'notEdit'
        },

        ui: {
            dishName: '#dish-name',
            dishCategory: '#dish-category',
            dishWeight: '#dish-weight',
            dishDescription: '#dish-description',
            dishPrice: '#dish-price'
         },

        initialize: function() {
            if (this.model.get('_id') === undefined){
                this.model.set('contentEditable','contentEditable');
                this.template = DishViewEdit;
            }
        },

        dishRemoved: function () {
            this.trigger('dish:removed', this.model);
            this.model.destroy();
        },

        dishEdit: function(){
            if (this.model.get('contentEditable') === undefined){
                this.model.set('contentEditable','contentEditable');
                this.template = DishViewEdit;
                this.render();

            }
            else{
                this.model.unset('contentEditable','silent');
                this.template = DishView;
                this.model.set('name', this.ui.dishName.val());
                this.model.set('category', this.ui.dishCategory.val());
                this.model.set('weight',this.ui.dishWeight.val());
                this.model.set('description',this.ui.dishDescription.val());
                this.model.set('price',this.ui.dishPrice.val());
                this.render();

                this.model.setPostUrl();

                this.model.save();

            }
        },

        notEdit: function () {
            this.model.unset('contentEditable','silent');
            this.template = DishView;
            this.render();
        }
    });
});
