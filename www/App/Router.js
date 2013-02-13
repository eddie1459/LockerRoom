define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'Views/MainView',
        'Views/Footer'
    ], function ($, _, backbone, marionette, mainview, footerView) {
        var appRouter = marionette.AppRouter.extend({
            routes: {
                "": "defaultAction"
            },
            defaultAction: function () {
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
                footer: "#footer"
            });

            backbone.history.start();
        };

        return {
            initialize: initialize
        };
    });