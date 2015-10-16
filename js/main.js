require.config({
    paths: {
        jquery: '../lib/vendor/jquery/dist/jquery',
        underscore: '../lib/vendor/underscore/underscore',
        backbone: '../lib/vendor/backbone/backbone',
        handlebars: '../lib/vendor/require-handlebars-plugin/hbs/handlebars.runtime',
        hbs: '../lib/vendor/require-handlebars-plugin/hbs',
        marionette: '../lib/vendor/backbone.marionette/lib/backbone.marionette',
        marionette_node: '../lib/vendor/backbone.marionette/lib/backbone.marionette',
        Router: 'Router',
        MainController: 'controllers/MainController',
        DayMenuModel: 'models/DayMenuModel',
        DishModel: 'models/DishModel',
        UserDayMenuModel: 'models/UserDayMenuModel',
        DishesCollection: 'collections/DishesCollection',
        DaysMenuCollection: 'collections/DaysMenuCollection',
        UserDaysMenuCollection: 'collections/UserDaysMenuCollection',
        headerView: 'views/headerView'
        //radio: '../node_modules/backbone.radio/build/backbone.radio'
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

