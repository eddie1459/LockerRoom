define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'Lib/Require/Plugins/text!Templates/Home.html'
    ], function ($, _, backbone, marionette, templ) {
        var view = marionette.ItemView.extend({            
            template: templ,
            events: {
                "click #showTeams": "showTeams",
                "change #statesList": "stateChanged",
                "change #sportsList": "sportChanged"
            },
            initialize: function () {
            },
            onShow: function() {
                $('#statesList').prop("selectedIndex", -1);
                $('#sportsList').prop("selectedIndex", -1);
            },
            showTeams: function(e) {
                LockerRoom.vent.trigger("showTeams");
            },
            stateChanged: function(e) {
                var stateId = $(e.currentTarget).val();

                LockerRoom.vent.trigger("stateChanged", stateId);
            },
            sportChanged: function(e) {
                var sportId = $(e.currentTarget).val();

                LockerRoom.vent.trigger("sportChanged", sportId);
            }
        });

        return view;
   });
