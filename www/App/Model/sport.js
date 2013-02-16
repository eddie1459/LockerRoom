define([
  'underscore',
  'backbone'
], function (_, backbone) {
    return backbone.Model.extend({
        url: function (){
            return LockerRoom.defaultUrl + '/api/sport';
        },
        defaults: function () {
            return {
                name: '',
                timestamp: ''
            };
        }
    });
});