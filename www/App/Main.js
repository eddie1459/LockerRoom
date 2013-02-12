require.config({
<<<<<<< HEAD
    // baseUrl: '/www/App',
    // baseUrl: '/App'
//               ,
//    paths: {
//        "jquery": 'Lib/Jquery/jquery-min',
//        "underscore": 'Lib/Underscore/underscore-min',
//        "backbone": 'Lib/Backbone/backbone-min',
//        "marionette": 'Lib/Backbone/backbone.marionette',
//        "iscroll": 'Lib/iscroll/iscroll-lite',
//        "cordova": 'Lib/cordova-2.3.0'
//    },
//    shims: {
//        "jquery": {
//            exports: ["jQuery", "$"]
//        },
//        "backbone": {
//            deps: ["underscore", "jquery"],
//            exports: "Backbone"
//        },
//        "underscore": {
//            deps: ["jquery"]
//        },
//        "marionette": {
//            deps: ["jquery", "underscore", "backbone"]
//        },
//        "cordova": {
//            exports: "cordova"
//        },
//    }
=======
    baseUrl: '/App',
    paths: {
        "jquery": 'Lib/Jquery/jquery-min',
        "underscore": 'Lib/Underscore/underscore-min',
        "backbone": 'Lib/Backbone/backbone-min',
        "marionette": 'Lib/Backbone/backbone.marionette',
        "iscroll": 'Lib/iscroll/iscroll-lite'
        //"cordova": 'Lib/cordova-2.3.0'
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
        }
        //"cordova": {
        //    exports: "cordova"
        //},
    }
>>>>>>> messing with the js to fix phonegap
});

require([
    'app'
], function (app) {
    alert(app);
    alert("Fuck You From Require.JS");
});