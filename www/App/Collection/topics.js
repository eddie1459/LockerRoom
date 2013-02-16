define([
  'backbone',
  'Model/topic'
], function (backbone, topic) {
    return backbone.Collection.extend({
        url: function (){
            return LockerRoom.defaultUrl + '/api/topic';
        },
        model: topic
    });
});