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
                // TODO:  Get this from config
                //var url = "#{socketaddress}";
                
                LockerRoom.SocketConnection.socket.on('get_comment'), function (c) {
                    console.log("Comment published");
                    $('#commentsList').prepend(data.topic);
                    // TODO: Prepend the new comment to the top of our div!
                };
            },
            onShow: function() {
                $('#saveCommentRegion').hide();
            },
            createComment: function(e) {
                $('#saveCommentRegion').show();
            },
            saveComment: function(e) {
                var cc = $('#newCommentContent').val();

                var newComment = new comment({ commentcontent: cc, topicid: this.model.get("TopicId") });

                newComment.save({}, {
                    success: function (m, r) {
                        var msg = "<li data-commentid=" + m.get('_id') + "><a href='javascript:void(0)'>" + m.get('commentcontent') + "</a></li>";
                        LockerRoom.SocketConnection.socket.emit('comment',{topic: msg});
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