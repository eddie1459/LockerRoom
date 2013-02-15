define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'Lib/Require/Plugins/text!Templates/Teams.html'
    ], function ($, _, backbone, marionette, templ) {
        var view = marionette.ItemView.extend({            
            template: templ,
            events: {
                "click a": "showTopics"
            },
            initialize: function () {
            },
            showTopics: function (e) {
                var teamId = $(e.currentTarget).data('teamid');

                LockerRoom.vent.trigger("showTopics", e, teamId);
            },
            pullDownAction: function  () {
                
            },
            onShow: function() {
                $('#wrapper').trigger('create');
            }
        });

        return view;
    });