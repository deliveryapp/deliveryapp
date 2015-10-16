require.config({
    paths: {
        jquery: '../../lib/vendor/jquery/dist/jquery',
        underscore: '../../lib/vendor/underscore/underscore',
        backbone: '../../lib/vendor/backbone/backbone',
        handlebars: '../../lib/vendor/require-handlebars-plugin/hbs/handlebars.runtime',
        hbs: '../../lib/vendor/require-handlebars-plugin/hbs',
        marionette: '../../lib/vendor/backbone.marionette/lib/backbone.marionette',
        marionette_node: '../../lib/vendor/backbone.marionette/lib/backbone.marionette',
        Router: 'Router',
        MainController: 'controllers/MainController',
        DayMenuModel: 'models/DayMenuModel',
        DishModel: 'models/DishModel',
        UserDayMenuModel: 'models/UserDayMenuModel',
        DishesCollection: 'collections/DishesCollection',
        DaysMenuCollection: 'collections/DaysMenuCollection',
        UserDaysMenuCollection: 'collections/UserDaysMenuCollection',
        headerView: 'dashboard/views/headerView',

        materialize : '../../lib/vendor/materialize/bin/materialize',

        tabs : '../../lib/vendor/materialize/js/tabs',
        hammer : '../../lib/vendor/materialize/js/jquery.hammer',
        hammerjs : '../../lib/vendor/materialize/js/hammer.min',
        velocity : '../../lib/vendor/materialize/js/velocity.min',
        'animation': '../../lib/vendor/materialize/js/animation',
        'buttons': '../../lib/vendor/materialize/js/buttons',
        'cards': '../../lib/vendor/materialize/js/cards',
        'character_counter': '../../lib/vendor/materialize/js/character_counter',
        'collapsible': '../../lib/vendor/materialize/js/collapsible',
        'picker': '../../lib/vendor/materialize/js/date_picker/picker',
        'picker.date': '../../lib/vendor/materialize/js/date_picker/picker.date',
        'dropdown': '../../lib/vendor/materialize/js/dropdown',
        'forms': '../../lib/vendor/materialize/js/forms',
        'global': '../../lib/vendor/materialize/js/global',
        'jquery.easing': '../../lib/vendor/materialize/js/jquery.easing.1.3',
        'jquery.hammer': '../../lib/vendor/materialize/js/jquery.hammer',
        'jquery.timeago': '../../lib/vendor/materialize/js/jquery.timeago.min',
        'leanModal': '../../lib/vendor/materialize/js/leanModal',
        'materialbox': '../../lib/vendor/materialize/js/materialbox',
        'parallax': '../../lib/vendor/materialize/js/parallax',
        'pushpin': '../../lib/vendor/materialize/js/pushpin',
        'scrollFire': '../../lib/vendor/materialize/js/scrollFire',
        'scrollspy': '../../lib/vendor/materialize/js/scrollspy',
        'sideNav': '../../lib/vendor/materialize/js/sideNav',
        'slider': '../../lib/vendor/materialize/js/slider',
        'toasts': '../../lib/vendor/materialize/js/toasts',
        'tooltip': '../../lib/vendor/materialize/js/tooltip',
        'transitions': '../../lib/vendor/materialize/js/transitions',
        'waves': '../../lib/vendor/materialize/js/waves'

        //radio: '../../node_modules/backbone.radio/build/backbone.radio'

    },
    'shim' : {
        'jquery': { exports: "$" },

        'animation': ['jquery'],
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
        }
    },

    hbs: { 
        helpers: true,            
        templateExtension: 'hbs', 
        partialsUrl: ''           
    }
});

require(["application"],function(application){
    application.start();
});