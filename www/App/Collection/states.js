define([
  'backbone',
  'Model/state'
], function (backbone, state) {
    return backbone.Collection.extend({
        url: '/api/state/',
        model: state
    });
});