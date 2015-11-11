define(function(require, exports, module) {
    var Marionette = require('marionette'),
        DishView = require('dishView'),
        emptyDishView = require('emptyDishView'),
        MainDishListView = require('hbs!dish-list/view/templates/main-dish-list-view');


    module.exports = Marionette.CompositeView.extend({
        template: MainDishListView,
        childView: DishView,
        childViewContainer: '#userList',
        childEvents:{
            'dish:removed': 'userClickedM'
        },

        events: {
            'change #filter-name' :'changed',
            'click .js-add-new-dish': 'addNewUser'
        },

        getEmptyView: function() {
            return emptyDishView;
        },

        userClickedM: function (view, model) {
            var confirm_result = confirm('Are you sure you want to remove ' + model.get('name') +  ' from the system?');

            if (confirm_result === true) {
                this.collection.remove(model);
            }
        },

        changed: function(evt) {
            this.trigger('filter:dishes:name:applied', evt.currentTarget.value);
        },

        addNewUser: function(){
            this.collection.unshift({'image_path': 'images/soup_icon.png'});
        }


    });


});