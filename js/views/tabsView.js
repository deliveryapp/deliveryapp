define(function (require) {
    var Marionette = require('marionette'),
        $ = require('jquery'),
        Tab = require('view/tabView');

    return Marionette.CollectionView.extend({
        tagName: 'div',
        className: 'row',
        childView: Tab,

        initialize: function () {

        },
        onRender: function(){

                //$el.children('ul.tabs').tabs();

        }
    });
});