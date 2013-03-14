define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'Collection/teams',
        'Views/FavoriteTeams',
        'Lib/Require/Plugins/text!Templates/NavigationPanel.html'
    ], function ($, _, backbone, marionette, teamsColl, favoriteTeamsView, templ) {
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
                //we need the list of favorites from the user object
                //got some mocked up for now
                var teamArray = [{_id: 1, name: "Mayfield"},
                            {_id: 2, name: "Murray"}];

                var model = backbone.Model.extend();
                var coll = new teamsColl(teamArray);
                var m = new model({"Teams": coll});

                var v = new favoriteTeamsView({ model: m });
                LockerRoom.main.show(v);

                $("#navigation-panel").panel( "close" );
            }
        });

        return view;
    });