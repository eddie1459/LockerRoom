define([
  'underscore',
  'backbone'
], function (_, backbone) {
    return backbone.Model.extend({
        url: '/api/state',
        defaults: function () {
            return {
                name: '',
                abbreviation: '',
                timestamp: '',
                counties: []
            };
        }
    });
});