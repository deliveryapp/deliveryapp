define(function (require, exports, module) {
    var Marionette = require('marionette'),
        $ = require('jquery'),
        _ = require('underscore'),
        TabsView = require('tabCollectionView'),
        DishesCollection = require('dishesCollection'),
        VirtualCollection = require('backboneVirtualCollection'),
        CardView = require('cardLayoutView'),
        DishModel = require('dishModel'),
        MenuPreselectionView = require('menuPreselectionView'),
        DayMenuSelectionView = require('dayMenuSelectionView'),
        UserOrdersCollection = require('userOrdersCollection'),
        DayMenuView = require('dayMenuView');

    module.exports = Marionette.Object.extend({
        getUserItem: function (userDaysMenu) {
            this.userOrdersCollection = userDaysMenu;
            this.dayDishesCollection = new DishesCollection(this.userOrdersCollection.at(0).get('dishes'));

            this.dayMenuSelectionView = new DayMenuSelectionView({collection: this.dayDishesCollection});

            this.dayMenuCollection = this.getOption('collection');
            //debugger;
            this.currentDay = this.dayMenuCollection.at(0);
            this.userOrdersCollection.map(function (model) {
                model.setRestDate();
            });

            this.currentOrderDayMenu = this.userOrdersCollection.findWhere({day: this.dayMenuCollection.at(0).restDate});
            this.currentDayMenu = this.dayMenuCollection.at(0);
            this.removeUserSelectedDishes(this.currentOrderDayMenu, this.dayMenuCollection.at(0), this.selectedDishes);

            //?!!
            /*this.userOrdersCollection.map(function (model) {
                model.setVisibleDate();
            });*/

            this.weekDays = this.dayMenuCollection.filter(function (item) {
                return item.get('day');
            });

            this.dayMenuDishes = this.dayMenuCollection.filter(function (item) {
                return item.get('dishes');
            });

            this.dishesCollection = new VirtualCollection(this.selectedDishes, {});
            var cardView = this.getItem();

            this.listenTo(this.cardView, 'days:swap', this.tabsStatus);
            return cardView;
        },

        getAdminItem: function (daysMenuCollection) {
            this.daysMenuCollection = daysMenuCollection;
            this.baseDishesCollection = this.getOption('collection');
            this.dishesCollection = this.baseDishesCollection.clone();
            //debugger;

            this.currentDayMenu = daysMenuCollection.at(0);
            this.removeSelectedDishes(this.dishesCollection, this.currentDayMenu, this.selectedDishes);

            this.weekDays = daysMenuCollection.filter(function (item) {
                return item.get('day');
            });
            this.dayDishesCollection = new DishesCollection(daysMenuCollection.at(0).get('dishes'));
            this.dayMenuSelectionView = new DayMenuSelectionView({collection: this.dayDishesCollection});

            this.dishesCollection = new VirtualCollection(this.selectedDishes, {});
            var cardView = this.getItem();
            this.listenTo(this.cardView, 'days:swap', this.tabsStatusAdmin);
            return cardView;
        },

        removeSelectedDishes: function (currentDayMenu, collection, selectedDishes) {
            this.selectedDishes = this.dishesCollection.clone();
            this.currentDayMenu.setRestDate();
            this.dishesCollection.map(function (dish) {
                this.currentDayMenu.get('dishes').map(function (dayDish) {
                    if (dish.get('_id') === dayDish._id)
                        this.selectedDishes.remove(dish);
                }.bind(this));

            }.bind(this));
            console.log(this.selectedDishes);
        },

        removeUserSelectedDishes: function (currentDayMenu, collection, selectedDishes) {

            this.selectedDayCollection = new DishesCollection(this.currentDayMenu.get('dishes'));
            this.selectedDishes = this.selectedDayCollection.clone();
            this.currentOrderDayMenu.get('dishes').map(function (orderDish) {
                this.selectedDayCollection.map(function (dish) {
                    if (dish.get('_id') === orderDish.dish._id)
                        this.selectedDishes.remove(dish);
                }.bind(this));

            }.bind(this));
            console.log(this.selectedDishes);
        },

        getItem: function () {
            this.tabsView = new TabsView({
                collection: new Backbone.Collection(this.weekDays)
            });

            this.dayMenuView = new DayMenuView({
                model: new DishModel(),
                collection: this.dishesCollection
            });

            this.cardView = new CardView({
                model: new Backbone.Model(),
                childViews: {
                    tabs: this.tabsView,
                    days: this.dayMenuView,
                    dayMenu: this.dayMenuSelectionView
                }
            });
            this.listenTo(this.dayMenuView, 'dish:added', this.dishAdded);
            this.listenTo(this.dayMenuView, 'filter:by:name:applied', this.nameFilterApplied);
            this.listenTo(this.dayMenuView, 'filter:by:category:applied', this.categoryFilterApplied);


            return this.cardView;

        },

        setSelectedMenu: function (dayMenuSelectionView) {
            this.dayMenuSelectionView = dayMenuSelectionView;
            this.cardView.showChildView('dayMenu', this.dayMenuSelectionView);
        },

        nameFilterApplied: function (phrase, category) {
            if (category === '0') {
                this.dishesCollection.updateFilter(function (model) {
                    return model.get('name').toLowerCase().indexOf(phrase) > -1;
                });
            } else if ( !_.isEmpty(category)) {
                this.dishesCollection.updateFilter(function (model) {
                    return model.get('name').toLowerCase().indexOf(phrase) > -1 && model.get('category').toLowerCase().indexOf(category) > -1;
                });
            } else {
                this.dishesCollection.updateFilter(function (model) {
                    return model.get('name').toLowerCase().indexOf(phrase) > -1;
                });
            }

        },

        categoryFilterApplied: function (category, phrase) {
            //debugger;
            if (category === '0') {
                this.dishesCollection.updateFilter(function (model) {
                    return model;
                });
            } else if ( !_.isEmpty(phrase)) {
                this.dishesCollection.updateFilter(function (model) {
                    return model.get('category').toLowerCase().indexOf(category) > -1 && model.get('name').toLowerCase().indexOf(phrase) > -1;
                });
            } else {
                this.dishesCollection.updateFilter(function (model) {
                    return model.get('category').toLowerCase().indexOf(category) > -1;
                });
            }
        },

        /* renderUserMenu: function () {
         this.dayMenuSelectionView.render();
         },
         */
        dishAdded: function (model) {
            this.trigger('dish:added', model);
        },

        removeDish: function (dish) {
            this.dayMenuView.collection.add(dish);
        },

        resetFilter: function () {
            this.dishesCollection.updateFilter(function (model) {
                return model;
            });
            this.dayMenuView.resetFilter();
        },

        tabsStatusAdmin: function (currentDay) {
            this.currentDayMenu = currentDay.model;
            this.resetFilter();

            this.dishesCollection.reset();
            this.baseDishesCollection.map(function (dish) {
                this.dishesCollection.add(dish);
            }.bind(this));
            //this.dishesCollection = this.getOption('collection');
            this.removeSelectedDishes();
            this.dishesCollection.reset();
            this.selectedDishes.map(function (model) {
                this.dishesCollection.add(model);
            }.bind(this));
            /*this.dishesCollection = new VirtualCollection(this.selectedDishes, {});
            this.dayMenuView.collection.reset();
            this.dishesCollection.map(function (dish) {
                this.dayMenuView.collection.add(dish);
            }.bind(this));*/
            this.trigger('tab:changed', currentDay.model.restDate);
        },

        tabsStatus: function (currentDay) {
            this.currentDayMenu = currentDay.model;
            this.currentOrderDayMenu = this.userOrdersCollection.findWhere({day: currentDay.model.restDate});
            this.dishesCollection.reset();
            var dayDishes = new Backbone.Collection(currentDay.model.get('dishes'));
            dayDishes.map(function (model) {
                this.dishesCollection.add(model);
            }.bind(this));

            this.removeUserSelectedDishes();
            //this.dishesCollection = new VirtualCollection(this.selectedDishes, {});
            this.dishesCollection.reset();
            this.selectedDishes.map(function (model) {
                this.dishesCollection.add(model);
            }.bind(this));
            /*debugger;
            this.dayMenuView.collection.reset();
            this.dishesCollection.map(function (dish) {
                this.dayMenuView.collection.add(dish);
            }.bind(this));*/
            this.trigger('tab:changed', currentDay.model.restDate);
        }

    });
});