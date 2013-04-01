define([
  'underscore',
  'backbone'
], function (_, backbone) {
    return backbone.Model.extend({
        url: function (){
            return LockerRoom.defaultUrl + '/api/user';
        },
        defaults: function () {
            return {
                _id: '',
                name: '',
                handle: '',
                agreed: false,
                teams: [],
                
                HasBasicInfo: function() {
                    if (this.name && this.handle && this.agreed) {
                        return true;
                    }
                    return false;
                }
            };
        }
    });
});