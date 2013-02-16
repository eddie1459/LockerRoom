define([
  'underscore',
  'backbone'
], function (_, backbone) {
    return backbone.Model.extend({
        url: function (){
            return LockerRoom.defaultUrl + '/api/state';
        },
        defaults: function () {
            return {
                name: '',
                abbreviation: '',
                timestamp: '',
                counties: []
            };
        }
    });
});