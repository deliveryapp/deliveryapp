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
        VirtualCollection = require('backboneVirtualCollection'),
        MenuPreselectionView = require('menuPreselectionView'),
        baseUrl = require('baseUrl'),
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

                //this.menuPreselectionView.showChildView('selectedUserMenu', this.dayMenuSelectionView);



                this.menuCard = new MenuDaysController({collection: this.dishesCollection});

                var menu = this.menuCard.getAdminItem(this.daysMenuCollection);

                this.menuPreselectionView.showChildView('dayMenu', menu);
                this.menuCard.setSelectedMenu(this.dayMenuSelectionView);
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

            //this.menuPreselectionView.showChildView('selectedUserMenu', this.dayMenuSelectionView);


            this.menuCard.setSelectedMenu(this.dayMenuSelectionView);
        },

        addDish: function(){

            this.getData().done(function () {

                this.virt_coll = new VirtualCollection(this.dishesCollection, {});
                this.dishList = new MainDishListView({collection: this.virt_coll});
                this.regions.get('content').show(this.dishList);

                this.listenTo(this.dishList, 'filter:dishes:name:applied', this.dishFilter);
                this.listenTo(this.dishList, 'dishes:saved', this.saveDish);

            }.bind(this));
        },

        editDish: function(){
            console.log('editDish');
        },

        index: function(){
            console.log('index');
        },

        userlist: function(){

            this.getData().done(function () {

                this.virt_coll = new VirtualCollection(this.usersCollection, {url:baseUrl+usersResource});
                this.userList = new MainUserListView({collection: this.virt_coll});
                this.regions.get('content').show(this.userList);

                this.listenTo(this.userList, 'filter:users:name:applied', this.userFilter);
                this.listenTo(this.userList, 'save:all:changes', this.syncCollection);
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
        },

        syncCollection: function () {
            //this.usersCollection.url = baseUrl+usersResource;
            //this.usersCollection.map(function (model) {
            //    model.save();//sync('update', model);//+'?id='+model.get('_id');
                //var data = model.toJSON();
                /*if(data._id === '56434e9f09a4a00f000f90ae')
                    $.ajax({
                        url: 'http://stark-eyrie-7510.herokuapp.com/users',
                        data: data,//.toJSON()
                        type: 'delete',
                        crossDomain: true,
                        success: function(data) { console.log(data); }
                    });*/
            //});
            //this.usersCollection.sync('update', this.usersCollection)
            //this.usersCollection.sync();
        },

        saveDish: function (data) {
            //this.dishesCollection.sync('update',this.dishesCollection);
            this.dishesCollection.map(function (model) {
                //Backbone.sync('update', model);//sync("update", model)
                $.ajax({
                 url: 'http://stark-eyrie-7510.herokuapp.com/dishes/',//'+model.get('_id')
                 data: model.toJSON(),
                 type: 'post',
                 crossDomain: true,
                 success: function(data) { console.log(data); }
                 });
            });

            /*$.ajax({
                url: 'http://stark-eyrie-7510.herokuapp.com/dishes',
                data: data,//.toJSON()
                type: 'post',
                crossDomain: true,
                success: function(data) { console.log(data); }
            });*/
        }



    });
});