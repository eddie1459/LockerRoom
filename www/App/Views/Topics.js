define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'Lib/Require/Plugins/text!Templates/Topics.html'
    ], function ($, _, backbone, marionette, templ) {
        var view = marionette.ItemView.extend({            
            template: templ,
	        events: {
                "click li": "showComments"
            },
            initialize: function () {
                // TODO:  Get this from config
                // var url = "#{socketaddress}";
                //var url = "http://localhost:3000/"
                //var socket = io.connect(url);
                //socket.on('topics-' + this.model.get("teamid"), function (t) {
                //    console.log("Topic published");

                    // TODO: Prepend the new topic to the top of our div!
                //});
            },
            showComments: function(e) {
                var topicId = $(e.currentTarget).data('topicid');

                LockerRoom.vent.trigger("showComments", e, topicId);
            }
        });

        return view;
    });