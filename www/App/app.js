define([
        'jquery',
        'underscore',
        'backbone',
        'Router'        
    ], function ($, _, backbone, router) {
        var initialize = function () {
            document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
            backbone.Marionette.TemplateCache.prototype.loadTemplate = function (templateId) {
                // Marionette expects "templateId" to be the ID of a DOM element.
                // But with RequireJS, templateId is actually the full text of the template.
                var template = templateId;

                // Make sure we have a template before trying to compile it
                if (!template || template.length === 0) {
                    var msg = "Could not find template: '" + templateId + "'";
                    var err = new Error(msg);
                    err.name = "NoTemplateError";
                    throw err;
                }

                // template = this.compileTemplate(template);

                return template;
            };
            router.initialize();
        };

        return {
            initialize: initialize
        };
    });