define(function (require, exports, module) {
    var Marionette = require('marionette'),
        template = require('hbs!../components/tabs/templates/tab-collection-view'),
        Tab = require('tabItemView');

    module.exports =  Marionette.CompositeView.extend({
        //tagName: 'div',
        template: template,
        childViewContainer: '.js-main-card-tabs',
        childView: Tab,
        childEvents: {
            'choosing': 'swapping'
        },
        initialize: function () {
            this.collection.at(0).set('className', 'b-button-tab_selected');
        },
        swapping: function (e) {
            //this.collection.changeClass(e ,state);
            //this.render();
            this.collection.map(function (model) {
                model.set('className', '');
                model.setVisibleDate();
            });
            e.model.set('className', 'b-button-tab_selected');
            this.render();
            console.log(e);
            this.trigger('days:swap', e);
        }
    });
});

