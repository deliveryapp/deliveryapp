define(function (require) {
    var Marionette = require('marionette'),
        $ = require('jquery'),
        Tab = require('view/tabView');

    return Marionette.CollectionView.extend({
        tagName: 'nav',
        className: 'row',
        childView: Tab,

        initialize: function () {

        },
    });
});
