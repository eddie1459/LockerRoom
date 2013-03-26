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

                //TODO: Attempt to retrieve the user information
                //      from the server. The server will hold the 
                //      user id if the user is logged in. 
                //      1. Ask the server if the user is logged in.
                //         a. If yes (and they've visited us before), we should receive back the userModel
                //         b. If yes (and they've not visited us before), navigate to the accountView.
                //         c. If no, navigate to the login page (for google, facebook, etc).
                var m = new userModel({ 
                    Greeting: "Welcome " + "user@email.com" + " Lets's take some time to setup your account." 
                });

                LockerRoom.layout = new accountView({ model: m});
                LockerRoom.main.show(LockerRoom.layout);
                
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
