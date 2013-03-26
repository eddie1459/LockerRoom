define([
        'jquery',
        'jquerymobile',
        'underscore',
        'backbone',
        'marionette',
        //'Views/Home',
        'Model/user',
        'Views/AccountInfo',
        'Views/Panel',
        'Views/Header',
        'ViewModel/HomeViewModel'
    ], function ($, jqm, _, backbone, marionette, userModel, accountView, panelView, headerView, homeVm) {
        var appRouter = marionette.AppRouter.extend({
            routes: {
                "": "defaultAction"
            },
            defaultAction: function () {
                LockerRoom.headerLayout = new headerView();
                LockerRoom.header.show(LockerRoom.headerLayout);

                // Assume to get this far we are logged in on a provider and we have a user record in our database
                // Assume the user record in our database includes id, name, and openId

                // TODO:  Inspect the user record for basic info (Name, NickName, and AgreedToTerms)
                home.getUser(function(m) {
                    if (m.HasBasicInfo && m.Teams.length > 0) {
                        // TODO:  if the user has filled out their basic info and has at least one team then navigate to the wall
                        // homeVm.getModel(function(m) {
                        //     LockerRoom.layout = new homeView({ model: m });
                        //     LockerRoom.main.show(LockerRoom.layout);
                        // });
                    } else if (m.HasBasicInfo && m.Teams.length == 0) {
                        // TODO:  if the user has filled out their basic info but has no teams navigate to the setup, then to the wall

                    } else if (!m.HasBasicInfo) {
                        // TODO:  if the user has not filled out the basic info navigate to "accountView" then navigate to setup/wall
                        // var m = new userModel({ 
                        //     Greeting: "Welcome " + "user@email.com" + " Lets's take some time to setup your account." 
                        // });

                        // LockerRoom.layout = new accountView({ model: m});
                        // LockerRoom.main.show(LockerRoom.layout);
                    }
                });

                LockerRoom.panelLayout = new panelView();
                LockerRoom.panel.show(LockerRoom.panelLayout);
            }
        });

        var initialize = function () {

            var app_router = new appRouter;

            LockerRoom = new marionette.Application();

            //put in http://localhost:3000 here to test in phonegap
            LockerRoom.defaultUrl = "http://localhost:3000";

            // kicking this off here to support anything that needs it early on
            LockerRoom.localvent = new marionette.EventAggregator();

            LockerRoom.addRegions({
                header: "#header",
                main: "#main",
                panel: "#navigation-panel"
            });

            backbone.history.start();
        };

        return {
            initialize: initialize
        };
    });
