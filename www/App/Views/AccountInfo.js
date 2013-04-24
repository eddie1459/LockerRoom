define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'Views/Home',
        'Model/user',
        'ViewModel/HomeViewModel',
        'Lib/Require/Plugins/text!Templates/AccountInfo.html'
    ], function ($, _, backbone, marionette, homeView, user, homeVm, templ) {
        var view = marionette.ItemView.extend({            
            template: templ,
            events: {
                "click #getStarted": "getStarted"
            },
            getStarted: function() {
                //var user = new user({ handle: $("nickName").val() });
                this.model.set("handle", $("#nickName").val());
                this.model.set("agreed", $("#checkbox-1").val())
                this.model.set("id", this.model.get("_id"));
                this.model.save({}, {
                    success: function (m, r) {
                        //direct user to add team screen
                    },
                    error: function (m, r) {
                        alert("Could not save the user.");
                    }
                });
                homeVm.getModel(function(m) {
                    var v = new homeView({ model: m });
                    LockerRoom.main.show(v);
                });
            },
        });

        return view;
   });