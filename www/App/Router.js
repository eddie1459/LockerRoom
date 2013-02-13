define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'Views/Header',
        'Views/Home',
        'Views/Footer',
        'ViewModel/HomeViewModel'
    ], function ($, _, backbone, marionette, headerView, homeView, footerView, homeVm) {
        var appRouter = marionette.AppRouter.extend({
            routes: {
                "": "defaultAction"
            },
            defaultAction: function () {
                LockerRoom.headerLayout = new headerView();
                LockerRoom.header.show(LockerRoom.headerLayout);

                homeVm.getModel(function(m) {
                    LockerRoom.layout = new homeView({ model: m });
                    LockerRoom.main.show(LockerRoom.layout);
                });

                LockerRoom.footerLayout = new footerView();
                LockerRoom.footer.show(LockerRoom.footerLayout);
            }
        });

        var initialize = function () {

            var app_router = new appRouter;

            LockerRoom = new marionette.Application();

            // kicking this off here to support anything that needs it early on
            LockerRoom.localvent = new marionette.EventAggregator();

            LockerRoom.addRegions({
                header: "#header",
                main: "#main",
                footer: "#footer"
            });

            backbone.history.start();
        };

        return {
            initialize: initialize
        };
    });
