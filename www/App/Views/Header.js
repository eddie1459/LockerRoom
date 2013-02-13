define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'Lib/Require/Plugins/text!Templates/Header.html'
    ], function ($, _, backbone, marionette, templ) {
        var view = marionette.Layout.extend({            
            template: templ,
            events: {
                "click #goBack": "goBack"
            },
            initialize: function () {
                var that = this;
            },
            render: function () {
                var template = _.template(templ);
                this.$el.html( template );
                return this.el;
                
            },
            goBack: function (view) {
                window.history.back();
            }
        });

        return view;
    });