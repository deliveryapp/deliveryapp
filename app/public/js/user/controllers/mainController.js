define(function (require, exports, module) {
    var Marionette = require('marionette'),

        DishesCollection = require('dishesCollection'),
        DaysMenuCollection = require('daysMenuCollection'),
        MainLayoutView = require('mainLayoutView'),

        MainDashboardView = require('mainDashboardView'),
        NavigationMenuLayoutView = require('navigationMenuLayoutView'),
        DayMenuView = require('dayMenuView'),
        MenuDaysController = require('menuDaysController'),

        UserDaysMenuCollection = require('userDaysMenuCollection'),
        MenuPreselectionView = require('menuPreselectionView'),

        DayMenuSelectionView = require('dayMenuSelectionView');

    module.exports = Marionette.Object.extend({

        regions: new Marionette.RegionManager({
            regions: {
                'main': '#application',
                'content': '#content'
            }
        }),

        initialize: function () {
            this.getData().done(function () {
                console.log(this.dishesCollection);
            }.bind(this));

            this.header = new MainLayoutView();
            this.regions.get('main').show(this.header);
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
            $.when(
                this.dishesCollection.fetch({reset: true}),
                this.daysMenuCollection.fetch({reset: true}),
                this.userDaysMenuCollection.fetch({reset: true}),

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


                this.menuPreselectionView = new MenuPreselectionView();

                this.regions.get('content').show( this.menuPreselectionView );

                this.dayDishesCollection = new DishesCollection(this.userDaysMenu.at(0).get('dishes'));
                //console.log(this.dayDishesCollection);

                this.dayMenuSelectionView = new DayMenuSelectionView({collection: this.dayDishesCollection});

                this.menuPreselectionView.showChildView('selectedUserMenu', this.dayMenuSelectionView);



                this.menuCard = new MenuDaysController({collection: this.daysMenuCollection});

                var menu = this.menuCard.getUserItem();

                this.menuPreselectionView.showChildView('dayMenu', menu);
                this.listenTo(this.menuCard, 'dish:added', this.dishAdded);
                this.listenTo(this.menuCard, 'tab:changed', this.tabChanged);
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
                $(".edit").addClass('disabled').removeAttr('href');
                $(".current-week").addClass('disabled').removeAttr('href');
            }.bind(this));

        },

        dishAdded: function (model) {
            this.dayDishesCollection.add(model);
        },

        tabChanged: function (date) {
            console.log(date);
            this.selectDay(date);
        },

        selectDay: function (date) {
            var serializedCollection = this.userDaysMenuCollection.toJSON();
            this.userDaysMenu = new UserDaysMenuCollection(serializedCollection[0].days);

            var filtered = this.userDaysMenu.filter(function (userDayMenu) {
                return userDayMenu.get('day') === date;
            });
            this.dayDishesCollection = new DishesCollection(filtered[0].get('dishes'));

            this.dayMenuSelectionView = new DayMenuSelectionView({collection: this.dayDishesCollection});

            this.menuPreselectionView.showChildView('selectedUserMenu', this.dayMenuSelectionView);
        },

        index: function () {
            console.log('index route');
            this.getData().done(function () {
                console.log(this.userDaysMenuCollection);
            }.bind(this));
        }

    });
});