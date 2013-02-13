define([
  'underscore',
  'backbone'
], function (_, backbone) {
    return backbone.Model.extend({
        url: '/api/topic',
        defaults: function () {
            return {
                name: '',
                teamid: '',
                timestamp: ''
            };
        }
    });
});