define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'Model/topic',
        'Lib/Require/Plugins/text!Templates/Topics.html'
    ], function ($, _, backbone, marionette, topic, templ) {
        var view = marionette.ItemView.extend({            
            template: templ,
	        events: {
                "click li": "showComments",
                "click #createTopic": "createTopic",
                "click #saveTopic": "saveTopic"
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
            onShow: function() {
                $('#saveTopicRegion').hide();
                $('#wrapper').trigger('create');
            },
            showComments: function(e) {
                var topicId = $(e.currentTarget).data('topicid');

                LockerRoom.vent.trigger("showComments", e, topicId);
            },
            createTopic: function(e) {
                $('#saveTopicRegion').show();
            },
            saveTopic: function(e) {
                var name = $('#newTopicContent').val();

                var newTopic = new topic({ name: name, teamid: this.model.get("TeamId") });

                newTopic.save({}, {
                    success: function (m, r) {
                        $('#topicsList').prepend(
                            "<li data-topicid=" + m.get('_id') + "><a href='javascript:void(0)'>" + m.get('name') + "</a></li>"
                        );
                        $('#saveTopicRegion').hide();
                    },
                    error: function (m, r) {
                        alert("Could not save the topic.");
                    }
                });   
            }
        });

        return view;
    });