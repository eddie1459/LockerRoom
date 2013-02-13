require.config({
    paths: {
        "jquery": 'Lib/Jquery/jquery-min',
        "underscore": 'Lib/Underscore/underscore-min',
        "backbone": 'Lib/Backbone/backbone-min',
        "marionette": 'Lib/Backbone/backbone.marionette',
        "iscroll": 'Lib/iscroll/iscroll-lite',
        "cordova": 'Lib/cordova-2.3.0',
        "jqueryMobile": 'Lib/Jquery/jqueryMobile_min'
    },
    shims: {
        "jquery": {
            exports: ["jQuery", "$"]
        },
        "backbone": {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        "underscore": {
            deps: ["jquery"]
        },
        "marionette": {
            deps: ["jquery", "underscore", "backbone"]
        },
        "cordova": {
            exports: "cordova"
        }
    }
});

require([
    'app'
], function (app) {
    app.initialize();
});