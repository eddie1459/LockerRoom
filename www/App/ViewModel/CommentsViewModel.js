define([
        'jquery',
        'underscore',
        'backbone',
        'Collection/comments'
    ], function ($, _, backbone, comments) {
        return {
            getModel: function(callback, topicId) {
                new comments().fetch({ 
                    data: {
                        topicid: topicId
                    },
                    success: function(comments) {
                        var model = backbone.Model.extend();
                        var m = new model({ Comments: comments });
                        callback(m);
                    }
                });
            }
        }
    });