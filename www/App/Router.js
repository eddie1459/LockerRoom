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

                //TODO: get user model from server
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
