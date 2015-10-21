define(function (require, exports, module) {
    var Marionette = require('marionette'),
        $ = require('jquery'),
        _ = require('underscore'),
        DishesCollection = require('DishesCollection'),
        DaysMenuCollection = require('DaysMenuCollection'),
        MainLayoutView = require('MainLayoutView'),
        TabsView = require('TabCollectionView'),
        CardView = require('CardLayoutView'),
        MainDashboardView = require('MainDashboardView'),
        NavigationMenuLayoutView = require('NavigationMenuLayoutView'),
        DayMenuView = require('DayMenuView'),
        UserDaysMenuCollection = require('UserDaysMenuCollection');

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
            this.dishesCollection = new DishesCollection();
            this.daysMenuCollection = new DaysMenuCollection();
            this.userDaysMenuCollection = new UserDaysMenuCollection();
            $.when(
                this.dishesCollection.fetch({reset: true}),
                this.daysMenuCollection.fetch({reset: true}),
                this.userDaysMenuCollection.fetch({reset: true})

            ).done(function () {


                }.bind(this));
        },

        menu: function () {
            this.tabsView = new TabsView({
                collection: new Backbone.Collection([
                    {name: 'Monday'},
                    {name: 'Tuesday'},
                    {name: 'Wednesday'},
                    {name: 'Thursday'},
                    {name: 'Friday'}
                ]),
                model: new Backbone.Model()
            });

            this.cardView = new CardView({
                model: new Backbone.Model()
            });

            this.regions.get('main').show(this.header);
            this.regions.get('content').show(this.cardView);
            //this.dayMenuView.showChildView('content', this.tabs);
            this.dayMenuView = new DayMenuView({collection: this.dishesCollection});

            this.cardView.showChildView('tabs', this.tabsView);
            this.cardView.showChildView('content', this.dayMenuView);
        },

        dashboard: function(){
            this.dashboard = new MainDashboardView();
            this.regions.get('content').show(this.dashboard);

        },

        index: function () {
            console.log('index route');
        }


    });
});