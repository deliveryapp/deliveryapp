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
        UserDaysMenuCollection = require('UserDaysMenuCollection'),
        MenuPreselectionView = require('MenuPreselectionView'),
        DayMenuSelectionView = require('DayMenuSelectionView');

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

                    var serializedCollection = this.userDaysMenuCollection.toJSON();
                    this.userDaysMenu = new UserDaysMenuCollection(serializedCollection[0].days);

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

            this.menuPreselectionView = new MenuPreselectionView();

            this.regions.get('main').show(this.header);
            this.regions.get('content').show(this.menuPreselectionView);

            this.dayMenuView = new DayMenuView({collection: this.dishesCollection});
            //this.dayMenuSelectionView = new DayMenuSelectionView({collection: this.dishesCollection});

            this.menuPreselectionView.showChildView('dayMenu', this.cardView);
            //this.menuPreselectionView.showChildView('selectedUserMenu', this.dayMenuSelectionView);

            this.cardView.showChildView('tabs', this.tabsView);
            this.cardView.showChildView('content', this.dayMenuView);


        },

        dashboard: function(){
            this.dashboard = new MainDashboardView({collection: this.userDaysMenu});
            this.regions.get('content').show(this.dashboard);

        },

        index: function () {
            console.log('index route');
        }


    });
});