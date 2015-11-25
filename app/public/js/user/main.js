require.config({
    paths: {
        jquery: '../../lib/vendor/jquery/dist/jquery',
        underscore: '../../lib/vendor/underscore/underscore',
        backbone: '../../lib/vendor/backbone/backbone',
        handlebars: '../../lib/vendor/require-handlebars-plugin/hbs/handlebars.runtime',
        hbs: '../../lib/vendor/require-handlebars-plugin/hbs',
        marionette: '../../lib/vendor/backbone.marionette/lib/backbone.marionette',
        backboneVirtualCollection: '../../lib/vendor/node_modules/backbone-virtual-collection/backbone.virtual-collection',
        //marionette_node: '../../lib/vendor/backbone.marionette/lib/backbone.marionette',
        router: 'router',
        mainController: 'controllers/main-controller',
        dayMenuModel: 'models/day-menu-model',
        dishModel: 'models/dish-model',
        userOrderModel: 'models/user-order-model',
        weekModel: 'models/week-model',
        userModel : 'models/user-model',
        dishesCollection: 'collections/dishes-collection',
        daysMenuCollection: 'collections/days-menu-collection',
        userOrdersCollection: 'collections/user-orders-collection',
        mainLayoutView: 'view/main-layout-view',
        mainDashboardView: 'dashboard/view/main-dashboard-view',
        dishCardView: '../components/dish-card/dish-card-view',
        dishCardEmpty: '../components/dish-card/dish-card-empty',
        dayMenuView: '../components/day-menu/day-menu-view',
        tabItemView: '../components/tabs/tab-item-view',
        tabCollectionView: '../components/tabs/tab-collection-view',
        cardLayoutView: '../components/card/card-layout-view',
        weekUserMenuView: 'dashboard/view/week-user-menu-view',
        dayUserMenuView: 'dashboard/view/day-user-menu-view',
        emptyDayUserMenuView: 'dashboard/view/empty-day-user-menu-view',
        menuPreselectionView: 'menu/views/menu-preselection-view',

        mainRegions: 'menu/views/main-regions',

        menuDaysController : '../components/card/menu-days-controller',
        userDishCardView : '../components/user-dish-card/user-dish-card-view',
        userDishCardEmpty: '../components/user-dish-card/user-dish-card-empty',

        dayMenuSelectionView: 'menu/views/day-menu-selection-view',

        baseUrl: '../url/base-url',
        daysResource: '../url/days-url',
        dishesResource: '../url/dishes-url',
        ordersResource: '../url/orders-url',
        usersResource: '../url/users-url',
        weeksResource: '../url/weeks-url',

        dishListCategory: '../constants/dish-list-category'
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