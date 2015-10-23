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
        MainLayoutView: 'view/MainLayoutView',
        NavigationMenuLayoutView: 'view/NavigationMenuLayoutView',

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
        'jquery': { exports: "$" }

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

require(["application"],function(application){
    application.start();
});