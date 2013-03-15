define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'Collection/teams',
        'Views/FavoriteTeams',
        'Views/Home',
        'ViewModel/HomeViewModel',
        'Lib/Require/Plugins/text!Templates/NavigationPanel.html'
    ], function ($, _, backbone, marionette, teamsColl, favoriteTeamsView, homeView, homeVm, templ) {
        var view = marionette.ItemView.extend({            
            template: templ,
            events: {
                "click #favoriteTeams": "showTeams",
                "click #home": "goHome"
            },
            initialize: function () {
            },
            onShow: function() {
            },
            goHome: function() {
                homeVm.getModel(function(m) {
                    LockerRoom.layout = new homeView({ model: m });
                    LockerRoom.main.show(LockerRoom.layout);
                    $("#navigation-panel").panel( "close" );
                });
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