﻿define([
        'jquery',
        'jqueryMobile',
        'underscore',
        'backbone',
        'marionette',
        'Views/Teams',
        'Views/MainView',
        'Views/Footer',
        'Views/Header'
    ], function ($, jqueryMobile, _, backbone, marionette, teamView, mainview, footerView, headerView) {
        var appRouter = marionette.AppRouter.extend({
            routes: {
                "": "defaultAction"
            },
            defaultAction: function () {
                LockerRoom.layout = new mainview();
                LockerRoom.main.show(LockerRoom.layout);
                LockerRoom.layoutFooter = new footerView();
                LockerRoom.footer.show(LockerRoom.layoutFooter);
                LockerRoom.layoutHeader = new headerView();
                LockerRoom.header.show(LockerRoom.layoutHeader);
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