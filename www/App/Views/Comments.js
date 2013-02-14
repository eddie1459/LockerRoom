define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'Lib/Require/Plugins/text!Templates/Comments.html'
    ], function ($, _, backbone, marionette, templ) {
        var view = marionette.ItemView.extend({            
            template: templ,
            initialize: function () {
                // TODO:  Get this from config
                // var url = "#{socketaddress}";
                //var url = "http://localhost:3000/"
                //var socket = io.connect(url);
                //socket.on('comments-' + this.model.get("topicid"), function (c) {
                //    console.log("Comment published");

                    // TODO: Prepend the new comment to the top of our div!
                //});
            }
        });

        return view;
    });