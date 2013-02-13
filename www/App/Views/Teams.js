define([
        'jquery',
        'underscore',
        'backbone',
        'Views/Topics',
        'Lib/Require/Plugins/text!Templates/Teams.html'
    ], function ($, _, backbone, topicsView, templ) {
        var view = backbone.View.extend({            
            template: templ,
            events: {
                "click li": "showTopics"
            },
            initialize: function () {
                var that = this;
                $("#goBack").off('click');
                $("#goBack").click(function (){
                    that.goBack();
                });
            },
            render: function () {
                var template = _.template(templ);
                this.$el.html( template );
                $("#goBack").show();
                return this.el;
            },
            showTopics: function (evt) {
                //TODO: need to show topics by teamId
                var view = new topicsView();
                LockerRoom.main.show(view);
            }
        });

        return view;
    });