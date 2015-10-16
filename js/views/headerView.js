define(function(require, exports, module) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Marionette = require('marionette'),
        handlebars = require('handlebars'),
        headerTemplateHBS = require('hbs!templates/header');



    module.exports = Marionette.LayoutView.extend({
        template: headerTemplateHBS

    });


});