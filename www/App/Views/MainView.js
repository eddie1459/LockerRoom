define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'Lib/Require/Plugins/text!Templates/Main.html'
    ], function ($, _, backbone, marionette, mainViewTemplate) {
        var layout = marionette.Layout.extend({            
            template: mainViewTemplate,
            initialize: function () {
            }
        });

        return layout;
    });