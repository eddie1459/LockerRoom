define([
        'jquery',
        'underscore',
        'backbone',
        'Lib/Require/Plugins/text!Templates/Topics.html'
    ], function ($, _, backbone, templ) {
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
                return this.el;
            }
        });

        return view;
    });