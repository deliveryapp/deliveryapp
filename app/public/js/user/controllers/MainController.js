define(function (require, exports, module) {
    var Marionette = require('marionette'),
        $ = require('jquery'),
        _ = require('underscore'),
        DishesCollection = require('DishesCollection'),
        DaysMenuCollection = require('DaysMenuCollection'),
        MainLayoutView = require('MainLayoutView'),
        TabsView = require('components/tabs/tabCollectionView'),
        CardView = require('components/card/cardLayoutView'),
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
            this.navigation = new NavigationMenuLayoutView();
            //this.regions.get('content').show(this.navigation);
            this.start();
        },

        start: function () {
            var dishesCollection = new DishesCollection();
            var daysMenuCollection = new DaysMenuCollection();
            var userDaysMenuCollection = new UserDaysMenuCollection();
            $.when(
                dishesCollection.fetch({reset: true}),
                daysMenuCollection.fetch({reset: true}),
                userDaysMenuCollection.fetch({reset: true})

            ).done(function () {
                    this.tabs = new TabsView({
                        collection: new Backbone.Collection([
                        {name: 'Monday'},
                        {name: 'Tuesday'},
                        {name: 'Wednesday'},
                        {name: 'Thursday'},
                        {name: 'Friday'}
                    ]),
                        model: new Backbone.Model(),
                        dishesCollection: dishesCollection
                        });

                    this.cardView = new CardView({
                        model: new Backbone.Model()
                    });

                    this.regions.get('main').show(this.header);
                    this.regions.get('content').show(this.cardView);
                    //this.dayMenuView.showChildView('content', this.tabs);
                    this.dayMenuView = new DayMenuView({collection: dishesCollection});

                    this.cardView.showChildView('tabs', this.tabs);
                    this.cardView.showChildView('content', this.dayMenuView);

                }.bind(this));
        },

        menu: function () {
            console.log('menu');
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