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
                topic: '',
                commenter: '',
                commentcontent: '',
                timestamp: '',
                numberOfResponses: 0,
                numberOfEnjoyables: 0
            };
        }
    });
});