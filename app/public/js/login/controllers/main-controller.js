define(function (require, exports, module) {
    var Marionette = require('marionette'),
        MainLayoutView = require('MainLayoutView');


    module.exports = Marionette.Object.extend({



        regions: new Marionette.RegionManager({
            regions: {
                'main': {
                    el: '#application'
                }


            }
        }),

        initialize: function () {
            this.header = new MainLayoutView();
            this.regions.get('main').show(this.header);
            console.log(this.regions);
        },

        index: function () {
            console.log('index route');
        }

    });
});