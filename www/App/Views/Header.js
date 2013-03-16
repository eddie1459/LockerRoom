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
        var view = marionette.ItemView.extend({            
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
            onShow: function() {
                //for some reason I have do this
                //the data tags in html do not always style em
                $("#goBackButton").button();
                $("#goForwardButton").button();
            },
            events: {
                "click #goBackButton": "goBack",
                "click #goForwardButton": "goForward"
            },
            homeClicked: function() {
                homeVm.getModel(function(m) {
                    var v = new homeView({ model: m });
                    LockerRoom.main.show(v);
                });
            },
            teamsClicked: function(e) {
                var that = this;
                teamVm.getModel(function(m) {
                    var v = new teamView({ model: m });
                    LockerRoom.main.show(v);
                    var myScroll = new iScroll('wrapper');
                    // var myScroll = new iScroll('wrapper', {
                    //     onRefresh: function () {
                    //         $('.pullDownLabel').innerHTML = 'Pull down to refresh...';
                    //     },
                    //     onScrollEnd: function () {      
                    //         teamVm.getModel(function(m) {
                    //             $('thelist').empty();
                    //             var li = document.createElement('li');

                    //             m.get("Teams").each(function(item){    
                    //                 $(li).attr("data-teamid", item.get("_id"));
                    //                 $(li).append("<a href='javascript:void(0)'>" + item.get("name") + "</a>");
                    //                 $('thelist').append(li);
                    //             });

                    //             myScroll.refresh();
                    //         }, that.selectedSportId, that.selectedStateId);   // Execute custom function (ajax call?)
                    //     }
                    // });
                }, this.selectedSportId, this.selectedStateId);
            },
            pullUpAction: function(myScroll, sportid, stateid) {
                teamVm.getModel(function(m) {
                    var el = $('thelist');
                    
                    el.empty();
                    var li = document.createElement('li');

                    m.get("Teams").each(function(item){    
                        $(li).attr("data-teamid", item.get("_id"));
                        $(li).append("<a href='javascript:void(0)'>" + item.get("name") + "</a>");
                        el.append(li);
                    });

                    myScroll.refresh();
                }, sportid, stateid);
                
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