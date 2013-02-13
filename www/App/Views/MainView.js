define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'Views/Home',
        'Views/Header',
        'Views/Footer',
        'Lib/Require/Plugins/text!Templates/Main.html'
    ], function ($, _, backbone, marionette, view, headerView, footerView, mainViewTemplate) {
        var layout = marionette.Layout.extend({            
            template: mainViewTemplate,
            regions: {             
                header: "#header",   
                content: "#content",
                footer: "#footer"
            },
            initialize: function () {
            },
            onShow: function (){
                this.header.show(new headerView());
                this.content.show(new view());
                this.footer.show(new footerView({ display: "Footer" }));
            }
        });

        return layout;
    });