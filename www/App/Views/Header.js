define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'Lib/Require/Plugins/text!Templates/Header.html'
    ], function ($, _, backbone, marionette, templ) {
        var view = marionette.Layout.extend({            
            template: templ,
            initialize: function () {
                var that = this;
            },
            render: function () {
                var template = _.template(templ);
                this.$el.html( template );
                return this.el;
                
            }
        });

        return view;
    });