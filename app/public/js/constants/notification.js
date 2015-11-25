define(function(require, exports, module){

    module.exports = function() {
        var BackboneRadio = require('backboneRadio'),
            $ = require ('jquery'),
            _ = require ('underscore');

        $.old_ajax = $.ajax;
        var ajaxErrorHandler = function (errorData) {
            errorData = errorData || {};

            var notification = {
                type: 'Error! ',
                name: 'Server error happened!',
                body: 'We are sorry, but due to an error service can\'t handle your request right'
            };
            _.extend(notification, errorData);
            var userChannel = BackboneRadio.channel('user');
            userChannel.trigger('notification:add', notification);
        };


        $.ajax = function(options) {

            var defaults = {
                statusCode: {
                    200: function (data) {
                        ajaxErrorHandler({
                            type: options.type,
                            name: '',
                            body: ''
                        });
                    },
                    400: function (data) {
                        ajaxErrorHandler({
                            body: data.responseText || '400 HTTP Error raised! Bad Request'
                        });
                    },
                    401: function (data) {
                        ajaxErrorHandler({
                            body: data.responseText || '401 HTTP Error raised! Unauthorized'
                        });
                    },
                    403: function (data) {
                        ajaxErrorHandler({
                            body: data.responseText || '403 HTTP Error raised! Forbidden'
                        });
                    },
                    404: function (data) {
                        ajaxErrorHandler({
                            body: '404 HTTP Error raised! Page not found'
                        });
                    },
                    500: function (data) {
                        ajaxErrorHandler({
                            body: data.responseText || '500 HTTP Error raised! Internal Server Error'
                        });
                    },
                    503: function (data) {
                        ajaxErrorHandler({
                            body: data.responseText || '503 HTTP Error raised! Service Unavailable'
                        });
                    }
                }
            };
            $.extend(options, defaults);
            return $.old_ajax(options);
        };
    };

});