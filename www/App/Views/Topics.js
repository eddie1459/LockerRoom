define([
        'jquery',
        'underscore',
        'backbone',
<<<<<<< HEAD
	    'Views/Messages'
=======
	    'Views/Messages',
>>>>>>> Fixing some things the merge busted
        'Lib/Require/Plugins/text!Templates/Topics.html'
    ], function ($, _, backbone, msgsView, templ) {
        var view = backbone.View.extend({            
            template: templ,
	        events: {
                "click li": "showMessages"
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
            render: function () {
                var template = _.template(templ);
                this.$el.html( template );
                $("#goBack").show();
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