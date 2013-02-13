define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'Views/Home',
        'Views/Teams',
        'Views/Topics',
        'Views/Messages',
        'Collection/states',
        'Collection/sports',
        'Lib/Require/Plugins/text!Templates/Header.html'
    ], function ($, _, backbone, marionette, homeView, teamView, topicView, commentView, states, sports, templ) {
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
                new states().fetch({ 
                    success: function(sts) {
                        new sports().fetch({
                            success: function(spts) {
                                var v = new homeView(new backbone.Model({
                                    States: sts,
                                    Sports: spts
                                }));
                                // TODO:  We need to revert main back
                                //        to make this work well.
                                // LockerRoom.content.show(v);
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