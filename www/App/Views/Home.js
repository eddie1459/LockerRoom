define([
        'jquery',
        'underscore',
        'backbone',
        'Lib/Require/Plugins/text!Templates/Home.html'
    ], function ($, _, backbone, templ) {
        var view = backbone.View.extend({            
            template: templ,
            initialize: function () {
            },
            render: function () {
                var template = _.template(templ);
                this.$el.html( template );
                return this.el;
            }
        });

        return view;
    });