define(function(require, exports, module){
    var Marionette = require('marionette'),
        $ = require('jquery'),
        _ = require('underscore'),
        UsersCollection = require ('usersCollection'),
        MainUserListView=require('mainUserListView'),
        DayMenuModel = require('dayMenuModel'),
        DishesCollection = require('dishesCollection'),
        DaysMenuCollection = require('daysMenuCollection'),
        MainLayoutView = require('mainLayoutView'),
        DayMenuSelectionView = require('dayMenuSelectionView'),
        MenuDaysController = require('menuDaysController'),
        VirtualCollection = require('backboneVirtualCollection'),
        MenuPreselectionView = require('menuPreselectionView'),
        MainDashboardView = require('mainDashboardView'),
        MainStatisticView = require('mainStatisticView'),
        baseUrl = require('baseUrl'),
        WeekModel = require('weekModel'),
        usersResource = require('usersResource'),

        MainDishListView = require ('mainDishListView');


    module.exports = Marionette.Object.extend({

            regions: new Marionette.RegionManager({
            regions: {
                'main': '#application',
                'content': '.js-content'

            }
        }),

        initialize: function () {
            this.header = new MainLayoutView();
            this.regions.get('main').show(this.header);
            this.start();
        },

        start: function () {

        },

        getData: function () {
            var res = $.Deferred();

            this.dishesCollection = new DishesCollection();
            this.usersCollection = new UsersCollection();
            $.when(
                this.dishesCollection.fetch({reset: true}),
                this.usersCollection.fetch({reset: true})
            ).done(function () {
                    res.resolve();
                }.bind(this));

            return res.promise();
        },

        getNextWeek: function () {
            var res = $.Deferred();

            this.weekModel = new WeekModel();
            this.weekModel.setNextWeekUrl();

            $.when(
                $.ajax({
                    url: 'http://stark-eyrie-7510.herokuapp.com/weeks/next',
                    type: 'get',
                    crossDomain: true,
                    success: function(data) {
                        this.weekModel = new WeekModel(data);
                    }.bind(this)
                })
            ).done(function () {
                    res.resolve();
                }.bind(this));

            return res.promise();
        },

        setNextWeek: function () {
            var res = $.Deferred();
            this.weekModel.setNextWeekUrl();
            console.log(this.weekModel.toJSON());
            $.when(
                $.ajax({
                    url: 'http://stark-eyrie-7510.herokuapp.com/weeks/'+this.weekModel.get('startDate'),
                    type: 'post',
                    data: this.weekModel.toJSON(),
                    crossDomain: true,
                    success: function(data) {
                        this.weekModel = new WeekModel(data);
                    }.bind(this)
                })
            ).done(function () {
                    res.resolve();
                }.bind(this));

            return res.promise();
        },

        menu: function() {
            this.getNextWeek().done(function () {
                if(this.weekModel.get('startDate') === undefined) {
                    //todo: prompt or whatever
                    var date = new Date(2015, 12, 1);
                    var startDate = date.getUTCDate();
                    this.weekModel.set('startDate', startDate);//new Date(Date.UTC(2015, 11, 19, 0, 0, 0))
                    this.setNextWeek().done(function () {
                        this.getNextWeek().done(function () {
                            this.prepareDayMenu();
                            console.log(this.weekModel);
                        }.bind(this));
                    }.bind(this));
                }
                else {

                    this.prepareDayMenu();

                }
            }.bind(this));
        },

        getDays: function () {
            var res = $.Deferred();
            var url = 'http://stark-eyrie-7510.herokuapp.com/days?day=';
            this.weekModel.get('days').map(function (day) {
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

        setDays: function () {
            var res = $.Deferred();
            this.daysMenuCollection = new DaysMenuCollection();
            var index = 0;
            var days = this.weekModel.get('days');
            //this.weekModel.add({days:["2015-11-30T00:00:00.000Z","2015-12-01T00:00:00.000Z","2015-12-02T00:00:00.000Z","2015-12-03T00:00:00.000Z","2015-12-04T00:00:00.000Z","2015-12-05T00:00:00.000Z","2015-12-06T00:00:00.000Z"]})
            for(index = 0; index <5; index++) {
                this.daysMenuCollection.add(new DayMenuModel({
                    'day': days[index],
                    'dishes': []
                }));
            }
            console.log(this.daysMenuCollection);
            this.daysMenuCollection.map(function (model) {
                model.setPostUrl();
                //model.setPutUrl();
                model.save();
                //model.destroy();
            });
        },

        prepareDayMenu: function () {
            this.getData().done(function () {
                console.log(this.weekModel);
                var days = this.weekModel.get('days');
                this.getDays().done(function () {
                    if(this.daysMenuCollection.length>0)
                        this.startDayMenu();
                    else
                    {
                        this.setDays();
                        this.startDayMenu();
                    }
                }.bind(this));

            }.bind(this));
        },

        startDayMenu: function() {
            this.menuPreselectionView = new MenuPreselectionView();

            this.regions.get('content').show( this.menuPreselectionView );

            this.currentDate = this.weekModel.get('days')[0];
            this.currentDay = this.daysMenuCollection.at(0);
            this.dayDishesCollection = new DishesCollection(this.daysMenuCollection.at(0).get('dishes'));

            this.dayMenuSelectionView = new DayMenuSelectionView({collection: this.dayDishesCollection});

            this.menuCard = new MenuDaysController({collection: this.dishesCollection});

            var menu = this.menuCard.getAdminItem(this.daysMenuCollection);

            this.menuPreselectionView.showChildView('dayMenu', menu);
            this.menuCard.setSelectedMenu(this.dayMenuSelectionView);
            this.listenTo(this.dayMenuSelectionView, 'day:menu:saved', this.dayMenuSaved);
            this.listenTo(this.menuCard, 'dish:added', this.dishAdded);
            this.listenTo(this.menuCard, 'tab:changed', this.tabChanged);
        },

        dayMenuSaved: function (collection) {
            this.currentDay.set('dishes', collection.toJSON());
            var date = new Date(this.currentDay.get('day'));

            //var dateString = date.getUTCFullYear()+'-'+date.getUTCMonth()+'-'+date.getUTCDay()+'T00:00:00.000Z';
            //save to rest

        },

        dashboard: function(){
            this.dashboard = new MainDashboardView();
            this.regions.get('content').show(this.dashboard);
        },

        statistic: function(){
            this.statisticPage = new MainStatisticView();
            this.regions.get('content').show(this.statisticPage);
        },

        dishAdded: function (model) {
            this.dayDishesCollection.add(model);
        },

        tabChanged: function (date) {
            console.log(date);
            this.selectDay(date);
        },

        selectDay: function (date) {

            var filtered = this.daysMenuCollection.filter(function (userDayMenu) {
                return userDayMenu.get('day') === date;
            });
            this.currentDay = filtered[0];
            this.dayDishesCollection = new DishesCollection(filtered[0].get('dishes'));
            this.dayMenuSelectionView = new DayMenuSelectionView({collection: this.dayDishesCollection});
            this.listenTo(this.dayMenuSelectionView, 'day:menu:saved', this.dayMenuSaved);

            this.menuCard.setSelectedMenu(this.dayMenuSelectionView);
        },

        addDish: function() {

            this.getData().done(function () {
                this.virt_coll = new VirtualCollection(this.dishesCollection, {});
                this.dishList = new MainDishListView({collection: this.virt_coll});
                this.regions.get('content').show(this.dishList);

                this.listenTo(this.dishList, 'filter:dishes:name:applied', this.dishFilter);

            }.bind(this));
        },


        userlist: function(){
            this.getData().done(function () {

                this.virt_coll = new VirtualCollection(this.usersCollection, {url:baseUrl+usersResource});
                this.userList = new MainUserListView({collection: this.virt_coll});
                this.regions.get('content').show(this.userList);

                this.listenTo(this.userList, 'filter:users:name:applied', this.userFilter);

            }.bind(this));
        },

        userFilter: function(name){

            name = name.toLowerCase();
            this.virt_coll.updateFilter(function (model) {
                return model.get('lastName').toLowerCase().indexOf(name) > -1;
            });
        },

        dishFilter: function(name){

            name = name.toLowerCase();
            this.virt_coll.updateFilter(function (model) {
                return model.get('name').toLowerCase().indexOf(name) > -1;
            });
        }
    });
});