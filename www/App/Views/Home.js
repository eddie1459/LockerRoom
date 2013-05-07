define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'ViewModel/TeamViewModel',
        'Views/Teams',
        'Lib/Require/Plugins/text!Templates/Home.html'
    ], function ($, _, backbone, marionette, teamVm, teamView, templ) {
        var view = marionette.ItemView.extend({            
            template: templ,
            events: {
                "click #showTeams": "showTeams"
            },
            initialize: function () {
            },
            onShow: function() {
                $('#statesList').prop("selectedIndex", -1);
                $('#sportsList').prop("selectedIndex", -1);
            },
            showTeams: function(e) {
                var that = this;
                teamVm.getModel(function(m) {
                    var v = new teamView({ model: m });
                    LockerRoom.main.show(v);
                    var myScroll = new iScroll('wrapper');
                }, $('#sportsList').val(), $('#statesList').val());
            }
        });
        return view;
   });
