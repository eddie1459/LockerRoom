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
                HasBasicInfo: false
            };
        },
        parse: function (res) {
            if (res.name && res.handle && res.agreed){
                res.HasBasicInfo = true;
            }else{
                res.HasBasicInfo = false;
            }
            return res;
        }
    });
});