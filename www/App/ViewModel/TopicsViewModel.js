define([
        'jquery',
        'underscore',
        'backbone',
        'Collection/topics'
    ], function ($, _, backbone, topics) {
        return {
            getModel: function(callback, teamId) {
                new topics().fetch({ 
                    data: {
                        teamid: teamId
                    },
                    success: function(tops) {
                        var model = backbone.Model.extend();
                        var m = new model({ Topics: tops });
                        callback(m);
                    }
                });
            }
        }
    });