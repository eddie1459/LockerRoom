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
                Landdb.layout = new mainview();
                Landdb.main.show(Landdb.layout);
            }
        });

        var initialize = function () {

            var app_router = new appRouter;

            Landdb = new marionette.Application();

            // kicking this off here to support anything that needs it early on
            Landdb.localvent = new marionette.EventAggregator();

            Landdb.addRegions({
                main: "#main"
                //header: "#header",
                //modal: ModalRegion
            });

            backbone.history.start();
        };

        return {
            initialize: initialize
        };
    });