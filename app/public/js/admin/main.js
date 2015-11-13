require.config({
    paths: {
        jquery: '../../lib/vendor/jquery/dist/jquery',
        underscore: '../../lib/vendor/underscore/underscore',
        backbone: '../../lib/vendor/backbone/backbone',
        handlebars: '../../lib/vendor/require-handlebars-plugin/hbs/handlebars.runtime',
        hbs: '../../lib/vendor/require-handlebars-plugin/hbs',
        marionette: '../../lib/vendor/backbone.marionette/lib/backbone.marionette',
        marionette_node: '../../lib/vendor/backbone.marionette/lib/backbone.marionette',
        backboneVirtualCollection: '../../lib/vendor/node_modules/backbone-virtual-collection/backbone.virtual-collection',
        Router: 'router',
        mainController: 'controllers/main-controller',
        dayMenuModel: 'models/day-menu-model',
        dishModel: 'models/dish-model',
        userModel:'models/user-model',
        weekModel: 'models/week-model',
        userOrderModel: 'models/user-order-model',
        usersCollection:'collections/users-collection',
        dishesCollection: 'collections/dishes-collection',
        daysMenuCollection: 'collections/days-menu-collection',
        userOrdersCollection: 'collections/user-orders-collection',
        mainLayoutView: 'view/main-layout-view',
        dayMenuSelectionView: 'menu/views/day-menu-selection-view',
        adminDishCardView : '../components/admin-dish-card/admin-dish-card-view',
        adminDishCardEmpty: '../components/admin-dish-card/admin-dish-card-empty',
        dishCardView: '../components/dish-card/dish-card-view',
        dishCardEmpty: '../components/dish-card/dish-card-empty',
        menuDaysController: '../components/card/menu-days-controller',
        menuPreselectionView: 'menu/views/menu-preselection-view',
        tabItemView: '../components/tabs/tab-item-view',
        tabCollectionView: '../components/tabs/tab-collection-view',
        cardLayoutView: '../components/card/card-layout-view',
        dayMenuView: '../components/day-menu/day-menu-view',
        mainUserListView:'user-list/view/main-user-list-view',
        userView: 'user-list/view/user-view',
        emptyUserView: 'user-list/view/empty-user-view',
        mainDishListView:'dish-list/view/main-dish-list-view',
        dishView:'dish-list/view/dish-view',
        emptyDishView:'dish-list/view/empty-dish-view',
        mainDashboardView:'dashboard/view/main-dashboard-view',
        mainStatisticView:'statistic/view/main-statistic-view',

        baseUrl: '../url/base-url',
        daysResource: '../url/days-url',
        dishesResource: '../url/dishes-url',
        ordersResource: '../url/orders-url',
        usersResource: '../url/users-url',
        weeksResource: '../url/weeks-url',
        mainAddDishView: 'dish-list/view/main-add-dish-view'

    },
    'shim' : {
        'jquery': { exports: '$' }


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