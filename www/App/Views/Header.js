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
        'ViewModel/TopicsViewModel',
        'ViewModel/CommentsViewModel',
        'Lib/Require/Plugins/text!Templates/Header.html'
    ], function ($, _, backbone, marionette, homeView, teamView, topicView, commentView, homeVm, teamVm, topicVm, commentVm, templ) {
        var view = marionette.Layout.extend({            
            template: templ,
            currentKey: "home",
            currentIndex: 0,
            selectedStateId: null,
            selectedSportId: null,
            selectedTeamId: null,
            selectedTopicId: null,
            navigate: function(e) {
                if (this.currentIndex == 0) {
                    this.homeClicked(e);
                } else if (this.currentIndex == 1) {
                    this.teamsClicked(e);
                } else if (this.currentIndex == 2) {
                    this.topicsClicked(e);
                } else if (this.currentIndex == 3) {
                    this.commentsClicked(e);
                }
            },
            initialize: function () {
                var $this = this;

                LockerRoom.vent.on("showHome", this.homeClicked);
                LockerRoom.vent.on("showTeams", this.teamsClicked);
                LockerRoom.vent.on("showTopics", function(e, teamId) { 
                    $this.selectedTeamId = teamId;
                    $this.topicsClicked(e);

                    $this.currentIndex = $this.currentIndex + 1;
                });
                LockerRoom.vent.on("showComments", function(e, topicId) {
                    $this.selectedTopicId = topicId;
                    $this.commentsClicked(e);

                    $this.currentIndex = $this.currentIndex + 1;
                });

                LockerRoom.vent.on("stateChanged", function(stateId) {
                    $this.selectedStateId = stateId;
                });

                LockerRoom.vent.on("sportChanged", function(sportId) {
                    $this.selectedSportId = sportId;
                });
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
                teamVm.getModel(function(m) {
                    var v = new teamView({ model: m });
                    LockerRoom.main.show(v);
                    var myScroll = new iScroll('wrapper');
                }, this.selectedSportId, this.selectedStateId);
            },
            topicsClicked: function(e) {
                topicVm.getModel(function(m) {
                    var v = new topicView({ model: m });
                    LockerRoom.main.show(v);
                }, this.selectedTeamId);
            },
            commentsClicked: function(e) {
                commentVm.getModel(function(m) {
                    var v = new commentView({ model: m });
                    LockerRoom.main.show(v);
                }, this.selectedTopicId);
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