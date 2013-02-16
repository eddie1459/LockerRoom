define([
  'underscore',
  'backbone'
], function (_, backbone) {
    return backbone.Model.extend({
        url: function (){
            return LockerRoom.defaultUrl + '/api/comment';
        },
        defaults: function () {
            return {
                topicid: '',
                commentcontent: '',
                timestamp: ''
            };
        }
    });
});