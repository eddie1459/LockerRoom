define([
  'backbone',
  'Model/topic'
], function (backbone, topic) {
    return backbone.Collection.extend({
        url: '/api/topic/',
        model: topic
    });
});