define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'Views/Topics',
        'Lib/Require/Plugins/text!Templates/Teams.html'
    ], function ($, _, backbone, marionette, topicsView, templ) {
        var view = marionette.ItemView.extend({            
            template: templ,
            events: {
                "click li": "showTopics"
            },
            initialize: function () {
            },
            // render: function () {
            //     var template = _.template(templ);
            //     this.$el.html( template );
            //     return this.el;
            // },
            showTopics: function (evt) {
                //TODO: need to show topics by teamId
                var view = new topicsView();
                LockerRoom.main.show(view);
            }
        });

        return view;
    });