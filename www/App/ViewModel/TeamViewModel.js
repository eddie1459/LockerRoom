define([
        'jquery',
        'underscore',
        'backbone',
        'Collection/teams'
    ], function ($, _, backbone, teams) {
        return {
            getModel: function(callback, sportId, stateId) {
                new teams().fetch({ 
                    data: {
                        sportid: sportId,
                        stateid: stateId
                    },
                    success: function(tms) {
                        var model = backbone.Model.extend();
                        var m = new model({ Teams: tms });
                        callback(m);
                    }
                });
            }
        }
    });