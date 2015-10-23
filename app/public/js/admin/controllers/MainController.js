define(function(require, exports, module){
    var Marionette = require("marionette"),
        $ = require("jquery"),
        _ = require("underscore"),
        MainLayoutView = require('MainLayoutView'),
        NavigationMenuLayoutView = require('NavigationMenuLayoutView');


    module.exports = Marionette.Object.extend({

        regions: new Marionette.RegionManager({
            regions: {
                "main": "#application",
                "content": "#content"

            }
        }),

        initialize: function () {
            this.header = new MainLayoutView();
            this.regions.get("main").show(this.header);
            this.navigation = new NavigationMenuLayoutView();
            this.regions.get("content").show(this.navigation);

            this.start();
        },

        start: function () {

        },

        menu: function(){
            console.log("menu");
        },

        dashboard: function(){
            console.log("dashboard");
        },

        statistic: function(){
            console.log("statistic");
        },

        addDish: function(){
            console.log("addDish");
        },

        editDish: function(){
            console.log("editDish");
        },

        index: function(){
            console.log("index");
        }


    });
});