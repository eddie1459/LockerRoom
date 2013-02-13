define([
  'backbone',
  'Model/sport'
], function (backbone, sport) {
    return backbone.Collection.extend({
        url: '/api/sport/',
        model: sport
    });
});