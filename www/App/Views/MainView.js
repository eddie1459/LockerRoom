define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'Views/Home',
        'Lib/Require/Plugins/text!Templates/Main.html'
    ], function ($, _, backbone, marionette, homeView, mainViewTemplate) {
        var layout = marionette.Layout.extend({            
            template: mainViewTemplate,
            regions: {                
                content: "#content"
            },
            initialize: function () {
                this.layout = new homeView();
                this.content.show(this.layout);
            }
        });

        return layout;
    });