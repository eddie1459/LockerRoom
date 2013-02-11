define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'Views/Home',
        'Lib/Require/Plugins/text!Templates/Main.html'
    ], function ($, _, backbone, marionette, view, mainViewTemplate) {
        var layout = marionette.Layout.extend({            
            template: mainViewTemplate,
            regions: {                
                content: "#content"
            },
            initialize: function () {
                
            },
            onShow: function (){
                var homeView = new view();
                this.content.show(homeView);
            }
        });

        return layout;
    });