define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'Views/Home',
        'Views/Teams',
        'Views/Topics',
        'Views/Comments',
        'ViewModel/HomeViewModel',
        'ViewModel/TeamViewModel',
        'Lib/Require/Plugins/text!Templates/Header.html'
    ], function ($, _, backbone, marionette, homeView, teamView, topicView, commentView, homeVm, teamVm, templ) {
        var view = marionette.Layout.extend({            
            template: templ,
            currentKey: "home",
            currentIndex: 0,
            navigate: function(e) {
                if (this.currentIndex == 0) {
                    this.homeClicked(e);
                } else if (this.currentIndex == 1) {
                    this.teamsClicked(e);
                } else if (this.currentIndex == 2) {
                    this.topicsClicked(e);
                } else if (this.currentIndex == 3) {
                    this.teamsClicked(e);
                }
            },
            initialize: function () {
                LockerRoom.vent.on("showHome", this.homeClicked);
                LockerRoom.vent.on("showTeams", this.teamsClicked);
                LockerRoom.vent.on("showTopics", this.topicsClicked);
                LockerRoom.vent.on("showComments", this.commentsClicked);
            },
            events: {
                "click #goBackButton": "goBack",
                "click #goForwardButton": "goForward",
            },
            homeClicked: function(e) {
                homeVm.getModel(function(m) {
                    var v = new homeView({ model: m });
                    LockerRoom.main.show(v);
                });
            },
            teamsClicked: function(e) {
                //stubbed in the sport and state ids for now.
                var sportId = '511ab6e60b17d5b59008b1a0';
                var stateId = '511aaf720b17d5b59008b174';
                teamVm.getModel(function(m) {
                    var v = new teamView({ model: m });
                    LockerRoom.main.show(v);
                }, sportId, stateId);
            },
            topicsClicked: function(e) {
                var v = new topicView(); // model
                LockerRoom.main.show(v);
            },
            commentsClicked: function(e) {
                var v = new commentView(); // model
                LockerRoom.main.show(v);
            },
            goBack: function(e) {
                if (this.currentIndex == 0) { return; }

                var i = this.currentIndex - 1;
                this.currentIndex = i;

                this.navigate(e);

            },
            goForward: function(e) {
                if (this.currentIndex == 3) { return; }

                var i = this.currentIndex + 1;
                this.currentIndex = i;

                this.navigate(e);
            }
        });

        return view;
    });