define(function (require, exports, module) {
    var Marionette = require('marionette'),
        Tab = require('tabItemView');

    module.exports =  Marionette.CollectionView.extend({
        tagName: 'ul',
        className: 'center-align ',
        childView: Tab,
        childEvents: {
            'choosing': 'swapping'
        },
        swapping: function (e) {
            //this.collection.changeClass(e ,state);
            //this.render();
            console.log(e);
            this.trigger('days:swap', e);
        }
    });
});

