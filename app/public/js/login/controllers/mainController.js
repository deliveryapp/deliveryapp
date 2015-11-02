define(function (require, exports, module) {
    var Marionette = require('marionette'),
        MainLayoutView = require('MainLayoutView');


    module.exports = Marionette.Object.extend({

        regions: new Marionette.RegionManager({
            regions: {
                'main': '#application'
            }
        }),

        initialize: function () {
            this.header = new MainLayoutView();
            this.regions.get('main').show(this.header);
        },

        index: function () {
            console.log('index route');
        }

    });
});