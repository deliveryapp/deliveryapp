define(function(require, exports, module){
    var Marionette = require('marionette'),
        $ = require('jquery'),
        _ = require('underscore'),
        UsersCollection = require ('usersCollection'),
        MainUserListView=require('mainUserListView'),
        DishesCollection = require('dishesCollection'),
        DaysMenuCollection = require('daysMenuCollection'),
        MainLayoutView = require('mainLayoutView'),
        NavigationMenuLayoutView = require('navigationMenuLayoutView'),
        DayMenuSelectionView = require('dayMenuSelectionView'),
        MenuDaysController = require('menuDaysController'),
        MenuPreselectionView = require('menuPreselectionView'),
        MainAddDishView = require('mainAddDishView');


    module.exports = Marionette.Object.extend({

        regions: new Marionette.RegionManager({
            regions: {
                'main': '#application',
                'content': '#content'

            }
        }),

        initialize: function () {
            this.header = new MainLayoutView();
            this.regions.get('main').show(this.header);
            this.navigation = new NavigationMenuLayoutView();
            this.regions.get('content').show(this.navigation);

            this.start();
        },

        start: function () {

        },

        getData: function () {
            var res = $.Deferred();

            this.dishesCollection = new DishesCollection();
            this.daysMenuCollection = new DaysMenuCollection();
            this.usersCollection = new UsersCollection();
            $.when(
                this.dishesCollection.fetch({reset: true}),
                this.daysMenuCollection.fetch({reset: true}),
                this.usersCollection.fetch({reset: true})
            ).done(function () {
                    res.resolve();
                }.bind(this));

            return res.promise();
        },

        menu: function(){
            //console.log('menu');
            this.getData().done(function () {
                this.userDaysMenu = this.daysMenuCollection;


                this.menuPreselectionView = new MenuPreselectionView();

                this.regions.get('content').show( this.menuPreselectionView );

                this.dayDishesCollection = new DishesCollection(this.daysMenuCollection.at(0).get('dishes'));
                //console.log(this.dayDishesCollection);

                this.dayMenuSelectionView = new DayMenuSelectionView({collection: this.dayDishesCollection});

                this.menuPreselectionView.showChildView('selectedUserMenu', this.dayMenuSelectionView);



                this.menuCard = new MenuDaysController({collection: this.dishesCollection});

                var menu = this.menuCard.getAdminItem(this.daysMenuCollection);

                this.menuPreselectionView.showChildView('dayMenu', menu);
                this.listenTo(this.menuCard, 'dish:added', this.dishAdded);
                this.listenTo(this.menuCard, 'tab:changed', this.tabChanged);
            }.bind(this));
        },

        dashboard: function(){
            console.log('dashboard');
        },

        statistic: function(){
            console.log('statistic');
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
            this.dayDishesCollection = new DishesCollection(filtered[0].get('dishes'));

            this.dayMenuSelectionView = new DayMenuSelectionView({collection: this.dayDishesCollection});

            this.menuPreselectionView.showChildView('selectedUserMenu', this.dayMenuSelectionView);
        },

        addDish: function(){
            this.addDishpage = new MainAddDishView();
            this.regions.get('content').show(this.addDishpage);
        },

        editDish: function(){
            console.log('editDish');
        },

        index: function(){
            console.log('index');
        },

        userlist: function(){

            this.getData().done(function () {
                this.userList = new MainUserListView({collection: this.usersCollection});
                this.regions.get('content').show(this.userList);
                console.log(this.usersCollection);
            }.bind(this));
        }



    });
});