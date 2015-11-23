define(function(require, exports, module) {
    var Marionette = require('marionette'),
        DishViewEdit=require('hbs!dish-list/view/templates/dish-view-edit'),
        DishView = require('hbs!dish-list/view/templates/dish-view');
    
    module.exports = Marionette.ItemView.extend({
        tagName: 'li',
        className: 'b-all-user__one-person',
        template: DishView,
        events: {
            'click .js-dish-remove': 'dishRemoved',
            'click .js-dish-edit': 'dishEdit',
            'click .js-dish-edit-save': 'dishEditSave',
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
            if (this.model.get('_id') === undefined && this.model.get('category') === undefined){
                this.template = DishViewEdit;
            }
        },

        dishRemoved: function () {
            this.trigger('dish:removed', this.model);
        },

        dishEdit: function() {
            this.template = DishViewEdit;
            this.render();

        },

        dishEditSave: function(){
            this.model.set('name', this.ui.dishName.val());
            this.model.set('category', this.ui.dishCategory.val());
            this.model.set('weight',this.ui.dishWeight.val());
            this.model.set('description',this.ui.dishDescription.val());
            this.model.set('price',this.ui.dishPrice.val());

            if (this.model.get('_id') === undefined){
                this.model.setPostUrl();
            }
            else{
                this.model.setPutUrl();
            }


            this.model.save(null,{success: function(){
                this.template = DishView;
                this.render();
            }.bind(this),
                error: function(){
                    alert('Validation error! Please, fill all fields!');
                }.bind(this)
            });


        },

        notEdit: function () {
            if (this.model.get('_id') === undefined){
                this.model.destroy();
            }
            else{
                this.template = DishView;
                this.render();
            }

        }
    });
});
