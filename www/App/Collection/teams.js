define([
  'backbone',
  'Model/team'
], function (backbone, team) {
    return backbone.Collection.extend({
        url: '/api/team/',
        model: team
    });
});