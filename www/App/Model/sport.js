define([
  'underscore',
  'backbone'
], function (_, backbone) {
    return backbone.Model.extend({
        url: '/api/sport',
        defaults: function () {
            return {
                name: '',
                timestamp: ''
            };
        }
    });
});