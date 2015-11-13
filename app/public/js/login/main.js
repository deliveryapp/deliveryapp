require.config({
    paths: {
        jquery: '../../lib/vendor/jquery/dist/jquery',
        underscore: '../../lib/vendor/underscore/underscore',
        backbone: '../../lib/vendor/backbone/backbone',
        handlebars: '../../lib/vendor/require-handlebars-plugin/hbs/handlebars.runtime',
        hbs: '../../lib/vendor/require-handlebars-plugin/hbs',
        marionette: '../../lib/vendor/backbone.marionette/lib/backbone.marionette',
        marionette_node: '../../lib/vendor/backbone.marionette/lib/backbone.marionette',
        Router: 'router',
        MainController: 'controllers/main-controller',
        MainLayoutView: 'view/main-layout-view'




    },
    'shim' : {
        'jquery': { exports: "$" }


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