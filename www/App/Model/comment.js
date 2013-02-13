define([
  'underscore',
  'backbone'
], function (_, backbone) {
    return backbone.Model.extend({
        url: '/api/comment',
        defaults: function () {
            return {
                topicid: '',
                commentcontent: '',
                timestamp: ''
            };
        }
    });
});