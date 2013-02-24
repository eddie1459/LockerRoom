require.config({
    paths: {
        "jquery": 'http://code.jquery.com/jquery-1.8.2.min',
        "jquerymobile": "http://code.jquery.com/mobile/1.3.0/jquery.mobile-1.3.0.min",
        "underscore": 'Lib/Underscore/underscore-min',
        "backbone": 'Lib/Backbone/backbone-min',
        "marionette": 'Lib/Backbone/backbone.marionette',
        "cordova": 'Lib/cordova-2.3.0'
    },
    shims: {
        "jquery": {
            exports: ["jQuery", "$"]
        },
        "jquerymobile": {
            deps: ["jquery"]
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
        },
    }
});

require([
    'app'
], function (app) {
    app.initialize();
});