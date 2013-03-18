define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'Views/Home',
        'ViewModel/HomeViewModel',
        'Lib/Require/Plugins/text!Templates/AccountInfo.html'
    ], function ($, _, backbone, marionette, homeView, homeVm, templ) {
        var view = marionette.ItemView.extend({            
            template: templ,
            events: {
                "click #getStarted": "getStarted"
            },
            getStarted: function() {
                homeVm.getModel(function(m) {
                    var v = new homeView({ model: m });
                    LockerRoom.main.show(v);
                });
            },
        });

        return view;
   });