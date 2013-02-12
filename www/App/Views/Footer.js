define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'Views/Home',
        'Lib/Require/Plugins/text!Templates/Footer.html'
    ], function ($, _, backbone, marionette, hv, templ) {
        var view = marionette.Layout.extend({            
            template: templ,
            events: {
                "click #home": "showHome"
            },
            initialize: function () {
            },
            render: function () {
                var template = _.template(templ);
                this.$el.html( template );
                return this.el;
            },
            showHome: function () {
                var homeView = new hv();
                LockerRoom.main.show(homeView);
            }
        });

        return view;
    });