define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'Views/Header',
        'Views/MainView',
        'Views/Footer'
    ], function ($, _, backbone, marionette, headerView, mainview, footerView) {
        var appRouter = marionette.AppRouter.extend({
            routes: {
                "": "defaultAction"
            },
            defaultAction: function () {
                LockerRoom.layoutHeader = new headerView();
                LockerRoom.header.show(LockerRoom.layoutHeader);
                LockerRoom.layout = new mainview();
                LockerRoom.main.show(LockerRoom.layout);
                LockerRoom.layoutFooter = new footerView();
                LockerRoom.footer.show(LockerRoom.layoutFooter);
            }
        });

        var initialize = function () {

            var app_router = new appRouter;

            LockerRoom = new marionette.Application();

            // kicking this off here to support anything that needs it early on
            LockerRoom.localvent = new marionette.EventAggregator();

            LockerRoom.addRegions({
                main: "#main",
                footer: "#footer",
                header: "#header"
            });

            backbone.history.start();
        };

        return {
            initialize: initialize
        };
    });