define([
        'jquery',
        'underscore',
        'backbone',
        'Lib/Require/Plugins/text!Templates/Home.html'
    ], function ($, _, backbone, marionette, templ) {
        var view = backbone.View.extend({            
            template: templ,
            initialize: function () {
            }
        });

        return view;
    });