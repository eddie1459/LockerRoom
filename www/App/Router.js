define([
        'jquery',
        'jquerymobile',
        'underscore',
        'backbone',
        'marionette',
        'Views/Home',
        'Views/Panel',
        'Views/Header',
        'ViewModel/HomeViewModel'
    ], function ($, jqm, _, backbone, marionette, homeView, panelView, headerView, homeVm) {
        var appRouter = marionette.AppRouter.extend({
            routes: {
                "": "defaultAction"
            },
            defaultAction: function () {
                LockerRoom.headerLayout = new headerView();
                LockerRoom.header.show(LockerRoom.headerLayout);

                //for some reason sometimes this loading with a callback 
                //causes the header's css to not render.
                homeVm.getModel(function(m) {
                    LockerRoom.layout = new homeView({ model: m });
                    LockerRoom.main.show(LockerRoom.layout);
                });

                LockerRoom.panelLayout = new panelView();
                LockerRoom.panel.show(LockerRoom.panelLayout);
            }
        });

        var initialize = function () {

            var app_router = new appRouter;

            LockerRoom = new marionette.Application();

            //put in http://localhost:3000 here to test in phonegap
            LockerRoom.defaultUrl = "";

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
