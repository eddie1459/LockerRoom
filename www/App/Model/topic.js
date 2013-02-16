define([
  'underscore',
  'backbone'
], function (_, backbone) {
    return backbone.Model.extend({
        url: function (){
            return LockerRoom.defaultUrl + '/api/topic';
        },
        defaults: function () {
            return {
                name: '',
                teamid: '',
                timestamp: ''
            };
        }
    });
});