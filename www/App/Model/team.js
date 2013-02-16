define([
  'underscore',
  'backbone'
], function (_, backbone) {
    return backbone.Model.extend({
        url: function (){
            return LockerRoom.defaultUrl + '/api/team';
        },
        defaults: function () {
            return {
                name: ''
            };
        }
    });
});