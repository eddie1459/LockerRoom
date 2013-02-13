define([
        'jquery',
        'underscore',
        'backbone',
	'Views/Messages'
        'Lib/Require/Plugins/text!Templates/Topics.html'
    ], function ($, _, backbone, msgsView, templ) {
        var view = backbone.View.extend({            
            template: templ,
	    events: {
                "click li": "showMessages"
            },
            initialize: function () {
            },
            render: function () {
                var template = _.template(templ);
                this.$el.html( template );
                return this.el;
            },
            showMessages: function (evt) {
                //TODO: need to show messages by topicId
                var view = new msgsView();
                LockerRoom.main.show(view);
            }
        });

        return view;
    });