define(function (require, exports, module) {
    var Marionette = require('marionette'),
        Backbone = require('backbone'),
        DishesCollection = require('dishesCollection'),
        DaysMenuCollection = require('daysMenuCollection'),
        WeekModel = require('weekModel'),
        MainLayoutView = require('mainLayoutView'),

        MainDashboardView = require('mainDashboardView'),
        NavigationMenuLayoutView = require('navigationMenuLayoutView'),
        MenuDaysController = require('menuDaysController'),

        MenuMainView = require('menuPreselectionView'),
        UserOrdersCollection = require('userOrdersCollection'),
        UserOrderModel = require('userOrderModel'),
        baseUrl = require('baseUrl'),
        weeksResource = require('weeksResource'),
        daysResource = require('daysResource'),
        ordersResource = require('ordersResource'),
        DayMenuSelectionView = require('dayMenuSelectionView');

    module.exports = Marionette.Object.extend({

        regions: new Marionette.RegionManager({
            regions: {
                'main': '#application',
                'content': '.js-content'
            }
        }),

        userId: '5644876700ce930f00fead4b',

        initialize: function () {
            this.mainLayoutView = new MainLayoutView();
            this.regions.get('main').show(this.mainLayoutView);
            this.navigation = new NavigationMenuLayoutView();
            this.regions.get('content').show(this.navigation);
            //this.start();
        },

        getCurrentWeek: function () {
            var res = $.Deferred();

            this.currentWeekModel = new WeekModel();
            this.currentWeekModel.setNextWeekUrl();

            $.when(
                $.ajax({
                    url: baseUrl+weeksResource+'/next',
                    type: 'get',
                    crossDomain: true,
                    success: function(data) {
                        this.currentWeekModel = new WeekModel(data);
                    }.bind(this)
                })
            ).done(function () {
                    res.resolve();
                }.bind(this));

            return res.promise();
        },

        getNextWeek: function () {
            var res = $.Deferred();

            this.nextWeekModel = new WeekModel();
            this.nextWeekModel.setNextWeekUrl();

            $.when(
                $.ajax({
                    url: baseUrl+weeksResource+'/next',
                    type: 'get',
                    crossDomain: true,
                    success: function(data) {
                        this.nextWeekModel = new WeekModel(data);
                    }.bind(this)
                })
            ).done(function () {
                    res.resolve();
                }.bind(this));

            return res.promise();
        },

        getDays: function () {
            var res = $.Deferred();
            var url = baseUrl+daysResource+'?day=';
            this.nextWeekModel.get('days').map(function (day) {
                url += day + ',';
            });
            console.log(url);
            //debugger;

            $.when(
                $.ajax({
                    url: url,
                    type: 'get',
                    crossDomain: true,
                    success: function(data) {
                        this.daysMenuCollection = new DaysMenuCollection(data);
                        console.log(this.daysMenuCollection);
                    }.bind(this)
                })
            ).done(function () {
                    res.resolve();
                }.bind(this));

            return res.promise();
        },

        getData: function () {
            var res = $.Deferred();

            this.dishesCollection = new DishesCollection();
            $.when(
                this.dishesCollection.fetch({reset: true}),
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

        preloadData: function () {
            this.getNextWeek().done(function () {
                if(this.nextWeekModel.get('startDate') === undefined) {
                    //todo: error when week doesn't exist
                }
                else {
                    this.getDays().done(function () {
                        if(this.daysMenuCollection.length>0)
                            this.prepareOrders();
                        else
                        {
                            //todo: error when days don't exist
                        }
                    }.bind(this));
                }
            }.bind(this));
        },

        getOrders: function () {
            var res = $.Deferred();
            var url = baseUrl+ordersResource+'/'+this.userId+'?day=';
            this.nextWeekModel.get('days').map(function (day) {
                url += day + ',';
            });
            console.log(url);
            //debugger;

            $.when(
                $.ajax({
                    url: url,
                    type: 'get',
                    crossDomain: true,
                    success: function(data) {
                        this.userOrdersCollection = new UserOrdersCollection(data);
                        console.log(this.userOrdersCollection);
                    }.bind(this)
                })
            ).done(function () {
                    res.resolve();
                }.bind(this));

            return res.promise();
        },

        setOrders: function () {
            var res = $.Deferred();
            this.userOrdersCollection = new UserOrdersCollection();
            var index = 0;
            var days = this.nextWeekModel.get('days');
            //this.nextWeekModel.add({days:["2015-11-30T00:00:00.000Z","2015-12-01T00:00:00.000Z","2015-12-02T00:00:00.000Z","2015-12-03T00:00:00.000Z","2015-12-04T00:00:00.000Z","2015-12-05T00:00:00.000Z","2015-12-06T00:00:00.000Z"]})
            for(index = 0; index < 5; index++) {
                this.userOrdersCollection.add(new UserOrderModel({
                    'userId': this.userId,
                    'paymentStatus': false,
                    'day': days[index],
                    'dishes': []
                }));
            }
            console.log(this.userOrdersCollection);
            this.userOrdersCollection.map(function (model) {
                model.setPostUrl();

                //model.setPutUrl();
                model.save();
                //model.destroy();
            });

        },

        prepareOrders: function () {
            this.getOrders().done(function () {
                if(this.userOrdersCollection.length>0) {
                    this.startMenu();
                }
                else {
                    this.setOrders();
                    this.startMenu();
                }
            }.bind(this));
        },

        startMenu: function () {
            this.getData().done(function () {


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

        menu: function () {
            this.preloadData();
        },

        nextWeek: function () {
            this.getData().done(function () {

                this.userNextWeekMenuCollection = new UserOrdersCollection(this.userNextWeekMenuCollection);
                this.dashboard = new MainDashboardView({collection: this.userNextWeekMenuCollection});
                this.regions.get('content').show(this.dashboard);
                $('.next-week').addClass('disabled').removeAttr('href');
            }.bind(this));
        },

        dashboard: function () {
            this.getData().done(function () {

                this.dashboard = new MainDashboardView({collection: this.userDaysMenuCollection});
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