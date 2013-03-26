define([
        'jquery',
        'underscore',
        'backbone',
        'Collection/states',
        'Collection/sports',
        'Model/user'
    ], function ($, _, backbone, states, sports, user) {
        return {
            getModel: function(callback) {
                new states().fetch({ 
                    success: function(sts) {
                        new sports().fetch({
                            success: function(spts) {
                                var model = backbone.Model.extend();
                                var m = new model({ States: sts, Sports: spts });
                                callback(m);
                            }
                        });
                    }
                });
            },
            getUser: function(callback) {
                new user().fetch({
                    success: function(m) {
                        callback(m);
                    };
                });
            }
        }
    });