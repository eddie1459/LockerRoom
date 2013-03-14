define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'Lib/Require/Plugins/text!Templates/FavoriteTeams.html'
    ], function ($, _, backbone, marionette, templ) {
        var view = marionette.ItemView.extend({            
            template: templ
        });

        return view;
    });