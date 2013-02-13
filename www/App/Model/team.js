define([
  'underscore',
  'backbone'
], function (_, backbone) {
    return backbone.Model.extend({
        url: '/api/team',
        defaults: function () {
            return {
                name: ''
            };
        }
    });
});