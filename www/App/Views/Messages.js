define([
        'jquery',
        'underscore',
        'backbone',
        'Views/Messages',
        'Lib/Require/Plugins/text!Templates/Messages.html'
    ], function ($, _, backbone, msgsView, templ) {
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