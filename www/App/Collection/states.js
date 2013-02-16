define([
  'backbone',
  'Model/state'
], function (backbone, state) {
    return backbone.Collection.extend({
        url: function (){
            return LockerRoom.defaultUrl + '/api/state';
        },
        model: state
    });
});