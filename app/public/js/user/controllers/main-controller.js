define(function (require, exports, module) {
    var Marionette = require('marionette'),
        Backbone = require('backbone'),
        DishesCollection = require('dishesCollection'),
        DaysMenuCollection = require('daysMenuCollection'),
        MainLayoutView = require('mainLayoutView'),

        MainDashboardView = require('mainDashboardView'),
        NavigationMenuLayoutView = require('navigationMenuLayoutView'),
        DayMenuView = require('dayMenuView'),
        MenuDaysController = require('menuDaysController'),

        UserDaysMenuCollection = require('userDaysMenuCollection'),
        MenuMainView = require('menuPreselectionView'),
        UserOrdersCollection = require('userOrdersCollection'),
        DayMenuSelectionView = require('dayMenuSelectionView');

    module.exports = Marionette.Object.extend({

        regions: new Marionette.RegionManager({
            regions: {
                'main': '#application',
                'content': '.js-content'
            }
        }),

        initialize: function () {
            this.mainLayoutView = new MainLayoutView();
            this.regions.get('main').show(this.mainLayoutView);
            this.navigation = new NavigationMenuLayoutView();
            this.regions.get('content').show(this.navigation);
            //this.start();
        },

        getData: function () {
            var res = $.Deferred();

            this.dishesCollection = new DishesCollection();
            this.daysMenuCollection = new DaysMenuCollection();
            this.userDaysMenuCollection = new UserDaysMenuCollection();
            this.userNextWeekMenuCollection = new UserDaysMenuCollection();
            this.userOrdersCollection = new UserOrdersCollection();
            $.when(
                this.dishesCollection.fetch({reset: true}),
                this.daysMenuCollection.fetch({reset: true}),
                this.userDaysMenuCollection.fetch({reset: true}),
                this.userOrdersCollection.fetch({reset:true}),
                $.getJSON('../db/userNextWeek.json', '', function (result) {
                    this.userNextWeekMenuCollection = result;
                }.bind(this))
            ).done(function () {
                    res.resolve();
                }.bind(this));

            return res.promise();
        },

        start: function () {
        },

        menu: function () {
            this.getData().done(function () {
                var serializedCollection = this.userDaysMenuCollection.toJSON();
                this.userDaysMenu = new UserDaysMenuCollection(serializedCollection[0].days);


                this.menuMainView = new MenuMainView();

                this.regions.get('content').show( this.menuMainView );

                this.dayDishesCollection = new DishesCollection(this.userOrdersCollection.at(0).get('dishes'));

                this.dayMenuSelectionView = new DayMenuSelectionView({collection: this.dayDishesCollection});

                //this.menuPreselectionView.showChildView('selectedUserMenu', this.dayMenuSelectionView);

                this.tabContainer = new MenuDaysController({collection: this.daysMenuCollection});

                this.generatedMenu = this.tabContainer.getUserItem(this.userOrdersCollection);
                //this.menuCard.setSelectedMenu(this.dayMenuSelectionView);
                this.menuMainView.showChildView('dayMenu', this.generatedMenu);

                this.tabContainer.setSelectedMenu(this.dayMenuSelectionView);
                this.listenTo(this.tabContainer, 'dish:added', this.dishAdded);
                this.listenTo(this.tabContainer, 'tab:changed', this.tabChanged);
            }.bind(this));
        },

        nextWeek: function () {
            this.getData().done(function () {
                var serializedCollection = this.userDaysMenuCollection.toJSON();
                this.userDaysMenu = new UserDaysMenuCollection(serializedCollection[0].days);
                this.userNextWeekMenuCollection = new UserDaysMenuCollection(this.userNextWeekMenuCollection[0].days);

                this.dashboard = new MainDashboardView({collection: this.userNextWeekMenuCollection});
                this.regions.get('content').show(this.dashboard);
                $('.next-week').addClass('disabled').removeAttr('href');
            }.bind(this));
        },

        dashboard: function () {
            this.getData().done(function () {
                var serializedCollection = this.userDaysMenuCollection.toJSON();
                this.userDaysMenu = new UserDaysMenuCollection(serializedCollection[0].days);
                this.userNextWeekMenuCollection = new UserDaysMenuCollection(this.userNextWeekMenuCollection[0].days);

                this.dashboard = new MainDashboardView({collection: this.userDaysMenu});
                this.regions.get('content').show(this.dashboard);
                $('.edit').addClass('disabled').removeAttr('href');
                $('.current-week').addClass('disabled').removeAttr('href');
            }.bind(this));

        },

        dishAdded: function (model) {
            this.dayDishesCollection.add(new Backbone.Model({dish: model.toJSON(), quantity: 1}));
            //this.generatedMenu.render();
            //this.dayMenuSelectionView.render();
        },

        tabChanged: function (date) {
            console.log(date);
            this.selectDay(date);
        },

        selectDay: function (date) {
            var serializedCollection = this.userDaysMenuCollection.toJSON();
            this.userDaysMenu = new UserDaysMenuCollection(serializedCollection[0].days);

            var filtered = this.userOrdersCollection.filter(function (userDayMenu) {
                return userDayMenu.get('day') === date;
            });
            this.dayDishesCollection = new DishesCollection(filtered[0].get('dishes'));

            this.dayMenuSelectionView = new DayMenuSelectionView({collection: this.dayDishesCollection});

            this.tabContainer.setSelectedMenu(this.dayMenuSelectionView);
            //this.menuPreselectionView.showChildView('selectedUserMenu', this.dayMenuSelectionView);
        },

        index: function () {
            console.log('index route');
            this.getData().done(function () {
                console.log(this.userDaysMenuCollection);
            }.bind(this));
        }

    });
});