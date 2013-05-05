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
                //had to hack this url since the model doesn't
                //exist on the server?
                this.model.url = "/api/user/" + this.model.get("_id");
                this.model.set("handle", $("#nickName").val());
                var agreed = $('#checkbox-1').attr('checked') ? 1 : 0;
                if (agreed === 1){
                    this.model.set("agreed", true);
                }else{
                    this.model.set("agreed", false);
                }
                this.model.id = this.model.get("_id");
                this.model.save({}, {
                    success: function (m, r) {
                        homeVm.getModel(function(m) {
                            var v = new homeView({ model: m });
                            LockerRoom.main.show(v);
                        });
                    },
                    error: function (m, r) {
                        alert("Could not save the user.");
                    }
                });
                
            },
        });

        return view;
   });