define(function(require, exports, module){
    var Marionette = require('marionette'),
        $ = require('jquery'),
        _ = require('underscore'),
        UsersCollection = require ('UsersCollection'),
        MainLayoutView = require('MainLayoutView'),
        NavigationMenuLayoutView = require('NavigationMenuLayoutView'),
        MainUserListView=require('MainUserListView'),
        MainAddDishView = require('MainAddDishView');


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

        getData: function () {
            var res = $.Deferred();

            this.usersCollection = new UsersCollection();

            $.when(
                this.usersCollection.fetch({reset: true})


            ).done(function () {
                    res.resolve();
                }.bind(this));

            return res.promise();
        },

        start: function () {

        },

        menu: function(){
            console.log('menu');
        },

        dashboard: function(){
            console.log('dashboard');
        },

        statistic: function(){
            console.log('statistic');
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