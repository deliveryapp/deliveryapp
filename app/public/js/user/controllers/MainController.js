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
            this.getData().done(function () {
                console.log(this.dishesCollection);
            }.bind(this));

            this.header = new MainLayoutView();
            this.regions.get('main').show(this.header);
            this.navigation = new NavigationMenuLayoutView();
            this.regions.get('content').show(this.navigation);
            //this.start();
        },

        getData: function () {
            var res = $.Deferred();

            this.dishesCollection = new DishesCollection();
            this.daysMenuCollection = new DaysMenuCollection();
            this.userDaysMenuCollection = new UserDaysMenuCollection();
            this.userNextWeekMenuCollection = new UserDaysMenuCollection();
            $.when(
                this.dishesCollection.fetch({reset: true}),
                this.daysMenuCollection.fetch({reset: true}),
                this.userDaysMenuCollection.fetch({reset: true}),

            $.getJSON('../db/userNextWeek.json','', function(result) {
                this.userNextWeekMenuCollection = result;
            }.bind(this))

            ).done(function () {
                    res.resolve();
                }.bind(this));

            return res.promise();
        },

        menu: function () {

            this.getData().done(function () {
                var serializedCollection = this.userDaysMenuCollection.toJSON();
                this.userDaysMenu = new UserDaysMenuCollection(serializedCollection[0].days);

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


                this.dayMenuDishesCollection = new DishesCollection(this.daysMenuCollection.at(0).get('dishes'));
            this.dayMenuView = new DayMenuView({collection: this.dayMenuDishesCollection});

            this.listenTo(this.dayMenuView,'dishAdded', this.dishAdded);

            this.menuPreselectionView.showChildView('dayMenu', this.cardView);




                this.dayDishesCollection = new DishesCollection(this.userDaysMenu.at(0).get('dishes'));
                console.log(this.dayDishesCollection);
                this.dayMenuSelectionView = new DayMenuSelectionView({collection: this.dayDishesCollection});
                this.menuPreselectionView.showChildView('selectedUserMenu', this.dayMenuSelectionView);

            this.cardView.showChildView('tabs', this.tabsView);
            this.cardView.showChildView('content', this.dayMenuView);
            }.bind(this));

        },
    nextWeek: function() {
        this.getData().done(function () {
                var serializedCollection = this.userDaysMenuCollection.toJSON();
                this.userDaysMenu = new UserDaysMenuCollection(serializedCollection[0].days);
                this.userNextWeekMenuCollection = new UserDaysMenuCollection(this.userNextWeekMenuCollection[0].days);

                this.dashboard = new MainDashboardView({collection: this.userNextWeekMenuCollection});
        this.regions.get('content').show(this.dashboard);
        $('.next-week').addClass('disabled').removeAttr('href');
        }.bind(this));
    },
        dashboard: function(){
            this.getData().done(function () {
                var serializedCollection = this.userDaysMenuCollection.toJSON();
                this.userDaysMenu = new UserDaysMenuCollection(serializedCollection[0].days);
                this.userNextWeekMenuCollection = new UserDaysMenuCollection(this.userNextWeekMenuCollection[0].days);

                this.dashboard = new MainDashboardView({collection: this.userDaysMenu});
                this.regions.get('content').show(this.dashboard);
                $(".edit").addClass('disabled').removeAttr('href');
                $(".current-week").addClass('disabled').removeAttr('href');
            }.bind(this));

        },

        dishAdded: function (model) {
            //todo:add dishes
            //dayDishesCollection.get('dishes').add()
            //console.log(model);
            this.dayDishesCollection.add(model);
        },

        index: function () {
            console.log('index route');
            this.getData().done(function () {
                console.log(this.userDaysMenuCollection);
            }.bind(this));
        }

    });
});