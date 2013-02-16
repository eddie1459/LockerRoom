define([
  'backbone',
  'Model/team'
], function (backbone, team) {
    return backbone.Collection.extend({
        url: function (){
            return LockerRoom.defaultUrl + '/api/team';
        },
        model: team
    });
});