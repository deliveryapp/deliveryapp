define(function (require, exports, module) {
    var Marionette = require('marionette'),
        Backbone = require('backbone'),
        DishesCollection = require('dishesCollection'),
        DaysMenuCollection = require('daysMenuCollection'),
        WeekModel = require('weekModel'),
        UserModel = require ('userModel'),
        MainLayoutView = require('mainLayoutView'),

        MainDashboardView = require('mainDashboardView'),
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


        initialize: function () {
            this.getActiveUser();
            this.mainLayoutView = new MainLayoutView({model: this.activeUser});
            this.regions.get('main').show(this.mainLayoutView);

        },

        getActiveUser: function(){

            this.activeUser = new UserModel({_id:'564c7c59cd0f210f00887524',
                firstName:'admin',
                lastName:'admin',
                image_path:'images/male.jpg',
                mail:'admin@engagepoint.com',
                __v:0,
                role:'admin'});

            this.userId = this.activeUser.get('_id');

           /*
            var res = $.Deferred();
            this.activeUser = new UserModel();
            this.activeUser.setActiveUserUrl();
            $.when(
                this.activeUser.fetch()
            ).done(function () {
            this.userId = this.activeUser.get('_id');
                    res.resolve();
                }.bind(this));

            return res.promise();*/
        },

        getCurrentWeek: function () {
            var res = $.Deferred();

            this.currentWeekModel = new WeekModel();
            this.currentWeekModel.setCurrentWeekUrl();

            $.when(
                this.currentWeekModel.fetch()
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
                this.nextWeekModel.fetch()
            ).done(function () {
                    res.resolve();
                }.bind(this));

            return res.promise();
        },

        getDays: function () {
            var res = $.Deferred();
            this.daysMenuCollection = new DaysMenuCollection();
            this.daysMenuCollection.setUrl(this.nextWeekModel);

            $.when(
                this.daysMenuCollection.fetch()
            ).done(function () {
                    res.resolve();
                }.bind(this));

            return res.promise();
        },


        preloadCurrentWeekData: function () {
            this.getCurrentWeek().done(function () {
                if(this.currentWeekModel.get('startDate') === undefined) {
                    //todo: error when week doesn't exist
                }
                else {
                    this.getDays().done(function () {
                        if(this.daysMenuCollection.length>0)
                            this.prepareOrders(this.currentWeekModel);
                        else
                        {
                            //todo: error when days don't exist
                        }
                    }.bind(this));
                }
            }.bind(this));
        },

        preloadNextWeekData: function () {
            this.getNextWeek().done(function () {
                if(this.nextWeekModel.get('startDate') === undefined) {
                    //todo: error when week doesn't exist
                }
                else {
                    this.getDays().done(function () {
                        if(this.daysMenuCollection.length>0)
                            this.prepareOrders(this.nextWeekModel);
                        else
                        {
                            //todo: error when days don't exist
                        }
                    }.bind(this));
                }
            }.bind(this));
        },

        getOrders: function (weekModel) {
            var res = $.Deferred();
            this.userOrdersCollection = new UserOrdersCollection();
            this.userOrdersCollection.setUrl(weekModel, this.userId);
            //debugger;

            $.when(
                this.userOrdersCollection.fetch()
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

        prepareOrders: function (weekModel) {
            this.getOrders(weekModel).done(function () {
                console.log(this.userOrdersCollection);
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
                this.menuMainView = new MenuMainView();

                this.regions.get('content').show( this.menuMainView );

                this.dayDishesCollection = new DishesCollection(this.userOrdersCollection.at(0).get('dishes'));

                this.dayMenuSelectionView = new DayMenuSelectionView({model:this.getDefaultMenuSelectionModel(), collection: this.dayDishesCollection});
                this.currentDay = this.dayDishesCollection;
                //this.menuPreselectionView.showChildView('selectedUserMenu', this.dayMenuSelectionView);

                this.tabContainer = new MenuDaysController({collection: this.daysMenuCollection});

                this.generatedMenu = this.tabContainer.getUserItem(this.userOrdersCollection);

                //this.menuCard.setSelectedMenu(this.dayMenuSelectionView);
                this.menuMainView.showChildView('dayMenu', this.generatedMenu);

                this.tabContainer.setSelectedMenu(this.dayMenuSelectionView);
                //user:day:menu:saved
                this.listenTo(this.dayMenuSelectionView, 'user:day:menu:saved', this.dayMenuSaved);
                this.listenTo(this.tabContainer, 'dish:added', this.dishAdded);
                this.listenTo(this.tabContainer, 'tab:changed', this.tabChanged);
        },

        dayMenuSaved: function (collection) {
            //todo: save user menu
            //debugger;
            this.currentDay.set('dishes', collection.toJSON());
            var date = new Date(this.currentDay.get('day'));

            this.currentDay.setRestDate();
            this.currentDay.setPutUrl(this.userId, this.nextWeekModel.get('days'));
            console.log(this.currentDay);
            console.log(this.currentDay.url);
            debugger;
            //this.currentDay.save();
            this.currentDay.setVisibleDate();
            console.log(this.currentDay);
            //save to rest
        },

        getDefaultMenuSelectionModel: function () {
            return new Backbone.Model({summary: 0});
        },

        menu: function () {
            this.preloadNextWeekData();
        },

        nextWeekDashboard: function () {

            this.getNextWeek().done(function () {
                this.getOrders(this.nextWeekModel);
                this.userOrdersCollection.state = 'next_week';
                this.nextMenuDashboard = new MainDashboardView({collection: this.userOrdersCollection});
                this.regions.get('content').show(this.nextMenuDashboard);
            }.bind(this));


        },

        dashboard: function () {
            this.getCurrentWeek().done(function () {
                this.getOrders(this.currentWeekModel);
                this.userOrdersCollection.state = 'current_week';
                this.dashboard = new MainDashboardView({collection: this.userOrdersCollection});
                this.regions.get('content').show(this.dashboard);
            }.bind(this));

        },

        dishAdded: function (model) {
            var dishInList = false;
            this.dayDishesCollection.map(function (dish) {
                if(dish.get('dish')._id === model.get('_id'))
                    dishInList = true;
            });
            if(!dishInList)
            {
                this.dayDishesCollection.add({dish: model.toJSON(), quantity: 1});
                console.log(this.dayDishesCollection.calculateSummary());
                this.dayMenuSelectionView.model = new Backbone.Model({summary: this.dayDishesCollection.calculateSummary()});
                this.dayMenuSelectionView.render();
            }
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
            this.currentDay = filtered[0];
            this.dayMenuSelectionView = new DayMenuSelectionView({model: this.getDefaultMenuSelectionModel(), collection: this.dayDishesCollection});

            this.tabContainer.setSelectedMenu(this.dayMenuSelectionView);
            this.listenTo(this.dayMenuSelectionView, 'user:day:menu:saved', this.dayMenuSaved);
        },

        index: function () {
            console.log('index route');
                console.log(this.userDaysMenuCollection);
        }

    });
});