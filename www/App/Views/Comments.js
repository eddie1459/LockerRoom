define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'Model/comment',
        'Lib/Require/Plugins/text!Templates/Comments.html'
    ], function ($, _, backbone, marionette, comment, templ) {
        var view = marionette.ItemView.extend({            
            template: templ,
            events: {
                "click #createComment": "createComment",
                "click #saveComment": "saveComment"
            },
            initialize: function () {
                var that = this;
                //creating a new socket each time the comments
                //are loaded because the messages are getting back
                //to this client, I think was due to having only
                //one socket for the whole app
                var url = "http://localhost:3000";
                this.socket = io.connect(url);
                this.socket.on('connect', function () {
                    that.socket.emit("setRoom", {room: that.model.get("TopicId")});
                });
                this.socket.on('comment', function (data) {
                     $('#commentsList').prepend(data);
                });
            },
            onClose: function() {
                this.socket.emit("leaveRoom", {room: this.model.get("TopicId")});
            },
            onShow: function() {
                $('#saveCommentRegion').hide();
            },
            createComment: function(e) {
                $('#saveCommentRegion').show();
            },
            saveComment: function(e) {
                var that = this;
                var cc = $('#newCommentContent').val();

                var newComment = new comment({ commentcontent: cc, topicid: this.model.get("TopicId") });

                newComment.save({}, {
                    success: function (m, r) {
                        var msg = "<li data-commentid=" + m.get('_id') + "><a href='javascript:void(0)'>" + m.get('commentcontent') + "</a></li>";
                        that.socket.emit('comment',{ comment: msg, room: that.model.get("TopicId")} );
                        $('#commentsList').prepend(msg);
                        $('#saveCommentRegion').hide();
                    },
                    error: function (m, r) {
                        alert("Could not save the comment.");
                    }
                });   
            }
        });

        return view;
    });