define([
  'backbone',
  'Model/sport'
], function (backbone, sport) {
    return backbone.Collection.extend({
        url: function (){
            return LockerRoom.defaultUrl + '/api/sport';
        },
        model: sport
    });
});