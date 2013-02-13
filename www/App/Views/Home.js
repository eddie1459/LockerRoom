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
                "click #showTeams": "showTeams"
            },
            initialize: function () {
            },
            showTeams: function(e) {
                LockerRoom.vent.trigger("showTeams");
            }
        });

        return view;
    });