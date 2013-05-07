define([
        'jquery',
        'jquerymobile',
        'underscore',
        'backbone',
        'marionette',
        'Model/user',
        'Views/AccountInfo',
        'Views/Panel',
        'Views/Header',
        'Views/Home',
        'ViewModel/HomeViewModel'
    ], function ($, jqm, _, backbone, marionette, userModel, accountView, panelView, headerView, homeView, homeVm) {
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
                //this will find a user if you click on the provider screen and pick the google provider
                //not sure why it doesn't keep the user session, may have to call the passport.authenticate over in
                //the users.js api call??
                homeVm.getUser(function(m) {
                    if (m.get("HasBasicInfo") && m.get("teams").length > 0) {
                        // TODO:  if the user has filled out their basic info and has at least one team then navigate to the wall
                        var wallModel = new WallModel({
                            user: m,
                            comments: []        // TODO:  Fetch from db using teams (last 10?)
                        });
                        var wallView = new WallView({ model: wallModel });
                        LockerRoom.main.show(wallView);
                    } else if (m.get("HasBasicInfo") && m.get("teams").length == 0) {
                        // TODO:  if the user has filled out their basic info but has no teams navigate to the setup, then to the wall
                        homeVm.getModel(function(m) {
                            LockerRoom.layout = new homeView({ model: m });
                            LockerRoom.main.show(LockerRoom.layout);
                        });
                    } else if (!m.get("HasBasicInfo")) {
                        // TODO:  if the user has not filled out the basic info navigate to "accountView" then navigate to setup/wall
                        // var m = new userModel({ 
                        //     Greeting: "Welcome " + m.get("name") + " Lets's take some time to setup your account." 
                        // });
                        m.set("Greeting", "Welcome " + m.get("name") + " Lets's take some time to setup your account.");

                        LockerRoom.layout = new accountView({ model: m});
                        LockerRoom.main.show(LockerRoom.layout);
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
