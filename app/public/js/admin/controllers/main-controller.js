define(function(require, exports, module){
    var Marionette = require('marionette'),
        $ = require('jquery'),
        _ = require('underscore'),
        UsersCollection = require ('usersCollection'),
        MainUserListView=require('mainUserListView'),
        OrdersCollection = require('ordersCollection'),
        DishesCollection = require('dishesCollection'),
        DaysMenuCollection = require('daysMenuCollection'),
        UserOrdersCollection = require('userOrdersCollection'),
        DayMenuModel = require('dayMenuModel'),
        MainLayoutView = require('mainLayoutView'),
        DayMenuSelectionView = require('dayMenuSelectionView'),
        MenuDaysController = require('menuDaysController'),
        VirtualCollection = require('backboneVirtualCollection'),
        MenuPreselectionView = require('menuPreselectionView'),
        MainStatisticView = require('mainStatisticView'),
        UserModel = require ('userModel'),
        baseUrl = require('baseUrl'),
        WeekModel = require('weekModel'),
        MainAdminMenuView = require ('mainAdminMenuView'),
        usersResource = require('usersResource'),
        weeksResource = require('weeksResource'),
        daysResource = require('daysResource'),
        MainDishListView = require ('mainDishListView');


    module.exports = Marionette.Object.extend({

        regions: new Marionette.RegionManager({
            regions: {
                'main': '#application',
                'content': '.js-content'

            }
        }),

        initialize: function () {
            this.getActiveUser();
            this.header = new MainLayoutView({model: this.activeUser});
            this.regions.get('main').show(this.header);
            this.start();
        },

        start: function () {

        },

        getActiveUser: function(){

            this.activeUser = new UserModel({_id:'564dfb0950b4270f00566a77',
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

        getAllUser: function(){

        },

        getData: function () {
            var res = $.Deferred();

            this.dishesCollection = new DishesCollection();
            this.usersCollection = new UsersCollection();
            this.ordersCollection = new OrdersCollection();
            $.when(
                this.dishesCollection.fetch({reset: true}),
                this.usersCollection.fetch({reset: true}),
                this.ordersCollection.fetch({reset: true})
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
                this.weekModel.fetch()
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
                    url: baseUrl+weeksResource+'/'+this.weekModel.get('startDate'),
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

                    //var startDate = '26-11-2015';
                    //startDate.toUTCString();
                    //debugger;
                    //var startDate = date.toUTCString();
                    //debugger;

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
            }.bind(this)).fail(function () {
                alert('Can\'t reach server!');
            });
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
            //this.testOrder();
        },

        /*testOrder: function () {
            var obj = {
                userId: '564486d300ce930f00fead46',
                day: '2015-11-20T00:00:00.000Z',
                paymentStatus: false,
                dishes: [{
                    dish: {id: '5644bed76164be0f00634a94'},
                    quantity: 2
                },{
                    dish: {id: '56447473dff2e80f007e4fff'},
                    quantity: 1
                }]
            };
            var url = 'http://stark-eyrie-7510.herokuapp.com/orders';
            $.ajax({
                url: url,
                type: 'post',
                crossDomain: true,
                data: obj,
                success: function(data) {
                    console.log('ok');
                    console.log(data);
                }.bind(this)
            });

            /!*obj = {
             day: '2015-11-30T00:00:00.000Z',
             dishes: [
             {_id: '5644bed76164be0f00634a94'},
             {_id: '56447473dff2e80f007e4fff'}
             ]
             };
             url = 'http://stark-eyrie-7510.herokuapp.com/days';
             $.ajax({
             url: url,
             type: 'post',
             crossDomain: true,
             data: obj,
             success: function(data) {
             console.log('ok');
             console.log(data);
             }.bind(this)
             });*!/

        },*/

        dayMenuSaved: function (collection) {
            this.currentDay.set('dishes', collection.toJSON());
            var date = new Date(this.currentDay.get('day'));

            this.currentDay.setRestDate();
            this.currentDay.setPutUrl();

            //this.currentDay.setPostUrl();
            var json = this.currentDay.toJSON();

            //json.date = json.day;
            json.date = json.day;


            console.log(json);
            //debugger;
            console.log(this.currentDay.url);
            $.ajax({
                url: this.currentDay.url,
                type: 'put',
                crossDomain: true,
                data: json,
                success: function(data) {
                    console.log('ok');
                    console.log(data);
                }.bind(this)
            });



            console.log(this.currentDay);
            //debugger;
            //this.currentDay.destroy();
            //debugger;

            this.currentDay.setVisibleDate();
            console.log(this.currentDay);



            //var url = 'http://stark-eyrie-7510.herokuapp.com/orders';


            //var dateString = date.getUTCFullYear()+'-'+date.getUTCMonth()+'-'+date.getUTCDay()+'T00:00:00.000Z';
            //save to rest

        },

        dashboard: function(){
            this.getNextWeek().done(function () {
                this.getUniqOrder().done(function () {

                        /*get 5 days array*/
                        this.weekModel.get('days').pop();
                        this.weekModel.get('days').pop();
                        var days = this.weekModel.get('days');
                        /*get 5 days array*/

                         /*get sum*/
                        var uniqUserOrders = this.uniqOrderCollection.where();
                        var sum = this.getSum(uniqUserOrders);
                        /*get sum*/
                     //this.dashboardOrderCollection = new OrdersCollection(finalArray);
                     //this.dashboard = new MainAdminMenuView({collection: this.dashboardOrderCollection});
                    // this.regions.get('content').show(this.dashboard);
                }.bind(this));
            }.bind(this));
        },

        statistic: function(){
            this.getNextWeek().done(function () {
                this.getUniqOrder().done(function () {
                    this.uniqUsersArray = this.uniqUserArray(this.uniqOrderCollection);
                    this.getUniqUser().done(function () {
                        var usersCollection = this.checkPaymentStatus(this.uniqOrderCollection,this.uniqUserCollection);
                        usersCollection = usersCollection.filter(function(model){
                            return (model.get('orderSum')) > 0;
                        });
                        usersCollection = new OrdersCollection(usersCollection);
                        this.virt_coll = new VirtualCollection(usersCollection, {url:baseUrl+usersResource});
                        this.statisticPage = new MainStatisticView({collection: this.virt_coll});
                        this.regions.get('content').show(this.statisticPage);
                        this.listenTo(this.statisticPage, 'status:changed', this.changePaymentStatus);
                    }.bind(this));

                }.bind(this));

            }.bind(this));
        },

        getUniqOrder: function(){
            var res = $.Deferred();

            this.uniqOrderCollection = new OrdersCollection();
            this.uniqOrderCollection.setGetUrl(this.weekModel);

            $.when(
               this.uniqOrderCollection.fetch()
            ).done(function () {
                    res.resolve();
                }.bind(this));

            return res.promise();
        },

        getUniqUser: function(){
             var res = $.Deferred();

             this.uniqUserCollection = new UsersCollection();
             this.uniqUserCollection.setGetUrl(this.uniqUsersArray);

             $.when(
                 this.uniqUserCollection.fetch()
             ).done(function () {
                     res.resolve();
                 }.bind(this));

             return res.promise();
         },

        uniqUserArray: function (userCollection){
            var arr = userCollection.pluck('userId');
            var uniqUserArray = [];
            for(var i = 0; i < arr.length; i++) {
                for(var j = i+1; j < arr.length; j++) {
                    if (arr[i] === arr[j] || arr[i]===undefined)
                        j = ++i;
                }
                uniqUserArray.push(arr[i]);
            }
            return uniqUserArray;
        },

        checkPaymentStatus: function (ordersCollection, uniqUserCollection){
           for(var i = 0; i< uniqUserCollection.length; i++ ){
               var uniqUserOrders = ordersCollection.where({userId: uniqUserCollection.at(i).get('_id')});
               var sum =  this.getSum(uniqUserOrders);
               var paymentStatus = this.getPaymentStatus(uniqUserOrders);
               uniqUserCollection.at(i).set('paymentStatus',paymentStatus);
               uniqUserCollection.at(i).set('orderSum',sum);
           }

           return uniqUserCollection;
        },

        getSum: function(ordersCollection){
            var sum = 0;
            for (var i= 0; i< ordersCollection.length;i++ ){
               var help = (ordersCollection[i].get('dishes'));
                help.map(function (model) {
                    var dish = model.dish;
                    var quantity = model.quantity;
                    sum += dish.price * quantity;
                });
            }
            return sum;
        },

        getPaymentStatus: function(ordersCollection){
           var status = true;
           for (var i= 0; i< ordersCollection.length;i++ ){
               if((ordersCollection[i].get('paymentStatus'))===false){
                   status = false;
               }
           }
            return status;
        },

        changePaymentStatus : function (data){

            var changePaymentStatusColl = this.uniqOrderCollection.where({userId: data});
            var paymentStatus = true;
            if (changePaymentStatusColl[0].get('paymentStatus')===true){
                paymentStatus = false;
            }
            changePaymentStatusColl = new OrdersCollection(changePaymentStatusColl);
            changePaymentStatusColl.map(function(model) {
                model.set('paymentStatus', paymentStatus);

                model.setPutUrl(data);
                model.save();

            });


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
                return userDayMenu.restDate === date;
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