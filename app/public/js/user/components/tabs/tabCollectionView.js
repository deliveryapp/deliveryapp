define(function (require, exports, module) {
    var Marionette = require('marionette'),
        Tab = require('./tabItemView');

    module.exports =  Marionette.CollectionView.extend({
        tagName: 'ul',
        className: 'center-align ',
        childView: Tab
    });
});