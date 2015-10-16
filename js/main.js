require.config({
    paths: {
        jquery: '../lib/vendor/jquery/dist/jquery',
        underscore: '../lib/vendor/underscore/underscore',
        backbone: '../lib/vendor/backbone/backbone',
        handlebars: '../lib/vendor/require-handlebars-plugin/hbs/handlebars.runtime',
        hbs: '../lib/vendor/require-handlebars-plugin/hbs',
        marionette: '../lib/vendor/backbone.marionette/lib/backbone.marionette',
        marionette_node: '../lib/vendor/backbone.marionette/lib/backbone.marionette',

        MainController: 'controllers/MainController',
        DayMenuModel: 'models/DayMenuModel',
        DishModel: 'models/DishModel',
        UserDayMenuModel: 'models/UserDayMenuModel',
        DishesCollection: 'collections/DishesCollection',
        DaysMenuCollection: 'collections/DaysMenuCollection',
        UserDaysMenuCollection: 'collections/UserDaysMenuCollection',
        materialize: '../lib/vendor/MaterializeAMD/bin/materialize',
        hammerjs: '../lib/vendor/MaterializeAMD/js/hammer.min',
        velocity: '../lib/vendor/MaterializeAMD/js/velocity.min'
        //radio: '../node_modules/backbone.radio/build/backbone.radio'
    },
    "shim": {
        "dist/js/materialize": {
            "deps": [
                "jquery",
                "../css/materialize.css!"
            ],
            "exports": "$"
        }
    },
    hbs: { 
        helpers: true,            
        templateExtension: 'hbs', 
        partialsUrl: ''           
    }
});

require(["application","jquery"],function(application,$){
    //window.jQuery = $;
    //window.jQuery = window.$ = require('jquery');
    application.start();

});