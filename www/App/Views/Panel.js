define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'Lib/Require/Plugins/text!Templates/NavigationPanel.html'
    ], function ($, _, backbone, marionette, templ) {
        var view = marionette.ItemView.extend({            
            template: templ,
            events: {
                "click #favoriteTeams": "showTeams",
            },
            initialize: function () {
            },
            onShow: function() {
            },
            showTeams: function(e) {
                //this needs to call the favorite Teams UI
            }
        });

        return view;
    });