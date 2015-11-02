require.config({
    paths: {
        jquery: '../../lib/vendor/jquery/dist/jquery',
        underscore: '../../lib/vendor/underscore/underscore',
        backbone: '../../lib/vendor/backbone/backbone',
        handlebars: '../../lib/vendor/require-handlebars-plugin/hbs/handlebars.runtime',
        hbs: '../../lib/vendor/require-handlebars-plugin/hbs',
        marionette: '../../lib/vendor/backbone.marionette/lib/backbone.marionette',
        backboneVirtualCollection: '../../lib/vendor/backbone-virtual-collection/backbone.virtual-collection',
        //marionette_node: '../../lib/vendor/backbone.marionette/lib/backbone.marionette',
        router: 'router',
        mainController: 'controllers/mainController',
        dayMenuModel: 'models/dayMenuModel',
        dishModel: 'models/dishModel',
        userDayMenuModel: 'models/userDayMenuModel',
        dishesCollection: 'collections/dishesCollection',
        daysMenuCollection: 'collections/daysMenuCollection',
        userDaysMenuCollection: 'collections/userDaysMenuCollection',
        mainLayoutView: 'view/mainLayoutView',
        navigationMenuLayoutView: 'view/navigationMenuLayoutView',
        mainDashboardView: 'dashboard/view/mainDashboardView',
        dishCardView: '../components/dishCard/dishCardView',
        dayMenuView: '../components/dayMenu/dayMenuView',
        tabItemView: '../components/tabs/tabItemView',
        tabCollectionView: '../components/tabs/tabCollectionView',
        cardLayoutView: '../components/card/cardLayoutView',
        weekUserMenuView: 'dashboard/view/weekUserMenuView',
        dayUserMenuView: 'dashboard/view/dayUserMenuView',
        menuPreselectionView: 'menu/views/menuPreselectionView',

        mainRegions: 'menu/views/mainRegions',

        menuDaysController : '../components/card/menuDaysController',
        userDishCardView : '../components/userDishCard/userDishCardView',

        dayMenuSelectionView: 'menu/views/dayMenuSelectionView'
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