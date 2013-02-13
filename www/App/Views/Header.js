define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'Views/Home',
        'Views/Teams',
        'Views/Topics',
        'Views/Comments',
        'Collection/states',
        'Collection/sports',
        'Lib/Require/Plugins/text!Templates/Header.html'
    ], function ($, _, backbone, marionette, homeView, teamView, topicView, commentView, states, sports, templ) {
        var view = marionette.Layout.extend({            
            template: templ,
            initialize: function () {
                LockerRoom.vent.on("showHome", this.homeClicked);
                LockerRoom.vent.on("showTeams", this.teamsClicked);
                LockerRoom.vent.on("showTopics", this.topicsClicked);
                LockerRoom.vent.on("showComments", this.commentsClicked);
            },
            events: {
                "click #homeLink": "homeClicked",
                "click #teamsLink": "teamsClicked",
                "click #topicsLink": "topicsClicked",
                "click #commentsLink": "commentsClicked",
            },
            homeClicked: function(e) {
                new states().fetch({ 
                    success: function(sts) {
                        new sports().fetch({
                            success: function(spts) {
                                var model = backbone.Model.extend();
                                var m = new model({ States: sts, Sports: spts });
                                var v = new homeView({ model: m });
                                LockerRoom.main.show(v);
                            }
                        });
                    }
                });
                
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