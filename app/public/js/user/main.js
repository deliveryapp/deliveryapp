require.config({
    paths: {
        jquery: '../../lib/vendor/jquery/dist/jquery',
        underscore: '../../lib/vendor/underscore/underscore',
        backbone: '../../lib/vendor/backbone/backbone',
        handlebars: '../../lib/vendor/require-handlebars-plugin/hbs/handlebars.runtime',
        hbs: '../../lib/vendor/require-handlebars-plugin/hbs',
        marionette: '../../lib/vendor/backbone.marionette/lib/backbone.marionette',
        //marionette_node: '../../lib/vendor/backbone.marionette/lib/backbone.marionette',
        Router: 'Router',
        MainController: 'controllers/MainController',
        DayMenuModel: 'models/DayMenuModel',
        DishModel: 'models/DishModel',
        UserDayMenuModel: 'models/UserDayMenuModel',
        DishesCollection: 'collections/DishesCollection',
        DaysMenuCollection: 'collections/DaysMenuCollection',
        UserDaysMenuCollection: 'collections/UserDaysMenuCollection',
        MainLayoutView: 'view/MainLayoutView',
        NavigationMenuLayoutView: 'view/NavigationMenuLayoutView',
        MainDashboardView: 'dashboard/view/MainDashboardView',
        DishCardView: '../components/DishCard/DishCardView',
        DayMenuView: '../components/DayMenu/DayMenuView',
        TabItemView: '../components/tabs/tabItemView',
        TabCollectionView: '../components/tabs/tabCollectionView',
        CardLayoutView: '../components/card/cardLayoutView',
        WeekUserMenuView: 'dashboard/view/WeekUserMenuView',
        DayUserMenuView: 'dashboard/view/DayUserMenuView',
        MenuPreselectionView: 'menu/views/MenuPreselectionView',

        MainRegions: 'menu/views/MainRegions',

        MenuDaysController : '../components/card/MenuDaysController',
        UserDishCardView : '../components/UserDishCard/UserDishCardView',

        DayMenuSelectionView: 'menu/views/DayMenuSelectionView'
    },

    hbs: { 
        helpers: true,            
        templateExtension: 'hbs', 
        partialsUrl: ''           
    }
});

require(['application'],function(application){
    application.start();
});