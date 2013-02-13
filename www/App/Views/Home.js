define([
        'jquery',
        'underscore',
        'backbone',
        'Views/Teams',
        'Lib/Require/Plugins/text!Templates/Home.html'
    ], function ($, _, backbone, teamsView, templ) {
        var view = backbone.View.extend({            
            template: templ,
            events: {
                "click #showTeams": "showTeams"
            },
            initialize: function () {
            },
            render: function () {
                var template = _.template(templ);
                this.$el.html( template );
                return this.el;
            },
            showTeams: function (){
                var view = new teamsView();
                LockerRoom.main.show(view);
            }
        });

        return view;
    });