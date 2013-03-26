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

                //TODO: Attempt to retrieve the user information from the server. 
                //      The server will hold the user id if the user is logged in. 
                //      1. Ask the server if the user is logged in.
                //         a. If yes (and they've visited us before), we should receive back the userModel, the nav to their wall
                //         b. If yes (and they've not visited us before), navigate to the accountView (fill out), then to setup
                //         c. If no, navigate to the login page (for google, facebook, etc)...how'd they get here? lol

                // Currently, we are saving the user record via Passport's strategy (see Google.js). We may want to rethink this...to allow for the
                // strategy I'm using here. Otherwise, the record will always have been created and we'll have to just inspect it to know where to
                // send the user...that could be okay...

                home.getUser(function(m) {
                    if (m) {
                        // TODO:  if the user (is in the db) has filled out First/Last Name, Nickname, and agreed to terms the navigate to the wall
                    } else {
                        // TODO:  if the user (is in the db) has not filled out the basic info navigate to "accountView" then navigate to their setup
                    }
                });

                // var m = new userModel({ 
                //     Greeting: "Welcome " + "user@email.com" + " Lets's take some time to setup your account." 
                // });

                // LockerRoom.layout = new accountView({ model: m});
                // LockerRoom.main.show(LockerRoom.layout);
                
                // homeVm.getModel(function(m) {
                //     LockerRoom.layout = new homeView({ model: m });
                //     LockerRoom.main.show(LockerRoom.layout);
                // });

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
