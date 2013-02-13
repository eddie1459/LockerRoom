define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'Views/Home',
        'Views/Teams',
        'Views/Topics',
        'Views/Messages',
        'Lib/Require/Plugins/text!Templates/Header.html'
    ], function ($, _, backbone, marionette, templ) {
        var view = marionette.Layout.extend({            
            template: templ,
            initialize: function () {
            },
            events: {
                "click #homeLink": "homeClicked",
                "click #teamsLink": "teamsClicked",
                "click #topicsLink": "topicsClicked",
                "click #commentsLink": "commentsClicked",
            },
            homeClicked: function(e) {
                var v = new homeView(); // model
                LockerRoom.Main.show(v);
            },
            teamsClicked: function(e) {
                var v = new teamView(); // model
                LockerRoom.Main.show(v);
            },
            topicsClicked: function(e) {
                var v = new topicsView(); // model
                LockerRoom.Main.show(v);
            },
            commentsClicked: function(e) {
                var v = new commentsView(); // model
                LockerRoom.Main.show(v);
            }
        });

        return view;
    });