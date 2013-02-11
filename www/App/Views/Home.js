define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'Lib/Require/Plugins/text!Templates/Home.html'
    ], function ($, _, backbone, marionette, templ) {
        var layout = marionette.Layout.extend({            
            template: templ,
            initialize: function () {
            }
        });

        return layout;
    });