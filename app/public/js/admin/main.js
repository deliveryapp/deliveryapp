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
        userDayMenuModel: 'models/user-day-menu-model',
        userModel:'models/user-model',
        userOrderModel: 'models/user-order-model',
        usersCollection:'collections/users-collection',
        dishesCollection: 'collections/dishes-collection',
        daysMenuCollection: 'collections/days-menu-collection',
        userDaysMenuCollection: 'collections/user-days-menu-collection',
        userOrdersCollection: 'collections/user-orders-collection',
        mainLayoutView: 'view/main-layout-view',
        navigationMenuLayoutView: 'view/navigation-menu-layout-view',
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

        baseUrl: '../url/base-url',
        daysResource: '../url/days-url',
        dishesResource: '../url/dishes-url',
        ordersResource: '../url/orders-url',
        usersResource: '../url/users-url',
        weeksResource: '../url/weeks-url',
        mainAddDishView: 'dish-list/view/main-add-dish-view'
        /*menuDaysController: '../components/card/menuDaysController',
        mainLayoutView: 'view/MainLayoutView',
        navigationMenuLayoutView: 'view/mavigationMenuLayoutView',
        menuPreselectionView: 'menu/views/menuPreselectionView',
        mainAddDishView: 'addDish/view/mainAddDishView',
        dayMenuSelectionView: 'menu/views/dayMenuSelectionView'*/


       /* materialize : '../../lib/vendor/Materialize/bin/materialize',

        tabs : '../../lib/vendor/Materialize/js/tabs',
        hammer : '../../lib/vendor/Materialize/js/jquery.hammer',
        hammerjs : '../../lib/vendor/Materialize/js/hammer.min',
        velocity : '../../lib/vendor/Materialize/js/velocity.min',
        'animation': '../../lib/vendor/Materialize/js/animation',
        'buttons': '../../lib/vendor/Materialize/js/buttons',
        'cards': '../../lib/vendor/Materialize/js/cards',
        'character_counter': '../../lib/vendor/Materialize/js/character_counter',
        'collapsible': '../../lib/vendor/Materialize/js/collapsible',
        'picker': '../../lib/vendor/Materialize/js/date_picker/picker',
        'picker.date': '../../lib/vendor/Materialize/js/date_picker/picker.date',
        'dropdown': '../../lib/vendor/Materialize/js/dropdown',
        'forms': '../../lib/vendor/Materialize/js/forms',
        'global': '../../lib/vendor/Materialize/js/global',
        'jquery.easing': '../../lib/vendor/Materialize/js/jquery.easing.1.3',
        'jquery.hammer': '../../lib/vendor/Materialize/js/jquery.hammer',
        'jquery.timeago': '../../lib/vendor/Materialize/js/jquery.timeago.min',
        'leanModal': '../../lib/vendor/Materialize/js/leanModal',
        'materialbox': '../../lib/vendor/Materialize/js/materialbox',
        'parallax': '../../lib/vendor/Materialize/js/parallax',
        'pushpin': '../../lib/vendor/Materialize/js/pushpin',
        'scrollFire': '../../lib/vendor/Materialize/js/scrollFire',
        'scrollspy': '../../lib/vendor/Materialize/js/scrollspy',
        'sideNav': '../../lib/vendor/Materialize/js/sideNav',
        'slider': '../../lib/vendor/Materialize/js/slider',
        'toasts': '../../lib/vendor/Materialize/js/toasts',
        'tooltip': '../../lib/vendor/Materialize/js/tooltip',
        'transitions': '../../lib/vendor/Materialize/js/transitions',
        'waves': '../../lib/vendor/Materialize/js/waves'*/

        //radio: '../../node_modules/backbone.radio/build/backbone.radio'

    },
    'shim' : {
        'jquery': { exports: '$' }

        /*'animation': ['jquery'],
        'buttons': ['jquery'],
        'cards': ['jquery'],
        'character_counter': ['jquery'],
        'collapsible': ['jquery'],
        'dropdown': ['jquery'],
        'forms': ['jquery', 'global'],
        'global': { deps: ['jquery'], exports: "Materialize" },
        'jquery.easing': ['jquery'],
        'jquery.hammer': ['jquery', 'hammerjs', 'waves'],
        'jquery.timeago': ['jquery'],
        'leanModal': ['jquery'],
        'materialbox': ['jquery'],
        'parallax': ['jquery'],
        'pushpin': ['jquery'],
        'scrollFire': ['jquery', 'global'],
        'scrollspy': ['jquery'],
        'sideNav': ['jquery'],
        'slider': ['jquery'],
        'tabs': ['jquery'],
        'toasts': ['global'],
        'tooltip': ['jquery'],
        'transitions': ['jquery','scrollFire'],
        'waves': { exports: 'Waves' },

        'materialize': {
            //deps: ['jquery', 'tabs', 'velocity', 'hammer', 'hammerjs'],
            deps: ['global', 'animation', 'buttons', 'cards', 'character_counter',
                'collapsible', 'dropdown', 'forms', 'hammerjs', 'jquery.easing',
                'jquery.hammer', 'jquery.timeago', 'leanModal', 'materialbox',
                'parallax', 'picker', 'picker.date', 'pushpin', 'scrollFire',
                'scrollspy', 'sideNav', 'slider', 'tabs', 'toasts', 'tooltip',
                'transitions', 'velocity', 'waves']
        }*/
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