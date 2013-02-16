define([
  'backbone',
  'Model/comment'
], function (backbone, comment) {
    return backbone.Collection.extend({
        url: function (){
            return LockerRoom.defaultUrl + '/api/comment';
        },
        model: comment
    });
});