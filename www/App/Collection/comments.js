define([
  'backbone',
  'Model/comment'
], function (backbone, comment) {
    return backbone.Collection.extend({
        url: '/api/comment/',
        model: comment
    });
});