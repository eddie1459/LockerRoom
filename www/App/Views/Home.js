define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'Lib/Require/Plugins/text!Templates/Home.html'
    ], function ($, _, backbone, marionette, templ) {
        var view = marionette.ItemView.extend({            
            template: templ,
            events: {
                "click #showTeams": "showTeams",
                "change #statesList": "stateChanged",
                "change #sportsList": "sportChanged"
            },
            initialize: function () {
            },
            onShow: function() {
                $('#statesList').prop("selectedIndex", -1);
                $('#sportsList').prop("selectedIndex", -1);
            },
            showTeams: function(e) {
                var that = this;
                teamVm.getModel(function(m) {
                    var v = new teamView({ model: m });
                    LockerRoom.main.show(v);
                    var myScroll = new iScroll('wrapper');
                    // var myScroll = new iScroll('wrapper', {
                    //     onRefresh: function () {
                    //         $('.pullDownLabel').innerHTML = 'Pull down to refresh...';
                    //     },
                    //     onScrollEnd: function () {      
                    //         teamVm.getModel(function(m) {
                    //             $('thelist').empty();
                    //             var li = document.createElement('li');

                    //             m.get("Teams").each(function(item){    
                    //                 $(li).attr("data-teamid", item.get("_id"));
                    //                 $(li).append("<a href='javascript:void(0)'>" + item.get("name") + "</a>");
                    //                 $('thelist').append(li);
                    //             });

                    //             myScroll.refresh();
                    //         }, that.selectedSportId, that.selectedStateId);   // Execute custom function (ajax call?)
                    //     }
                    // });
                }, this.selectedSportId, this.selectedStateId);
            },
            stateChanged: function(e) {
                var stateId = $(e.currentTarget).val();

                LockerRoom.vent.trigger("stateChanged", stateId);
            },
            sportChanged: function(e) {
                var sportId = $(e.currentTarget).val();
                //if ($("statesList")
               // LockerRoom.vent.trigger("sportChanged", sportId);
            }
        });

        return view;
   });
