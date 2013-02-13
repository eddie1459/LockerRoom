define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'Views/MainView'
    ], function ($, _, backbone, marionette, mainview) {
        var appRouter = marionette.AppRouter.extend({
            routes: {
                "": "defaultAction"
            },
            defaultAction: function () {
                LockerRoom.layout = new mainview();
                LockerRoom.main.show(LockerRoom.layout);
            }
        });

        var initialize = function () {

            var app_router = new appRouter;

            LockerRoom = new marionette.Application();

            // kicking this off here to support anything that needs it early on
            LockerRoom.localvent = new marionette.EventAggregator();

            LockerRoom.addRegions({
                main: "#main",
            });

            backbone.history.start();
        };

        return {
            initialize: initialize
        };
    });