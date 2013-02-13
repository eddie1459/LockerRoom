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
    ], function ($, _, backbone, marionette, homeView, teamView, topicView, commentView, templ) {
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
                LockerRoom.main.show(v);
            },
            teamsClicked: function(e) {
                var v = new teamView(); // model
                LockerRoom.main.show(v);
            },
            topicsClicked: function(e) {
                var v = new topicView(); // model
                LockerRoom.main.show(v);
            },
            commentsClicked: function(e) {
                var v = new commentView(); // model
                LockerRoom.main.show(v);
            }
        });

        return view;
    });