define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'Views/Home',
        'Views/Teams',
        'Views/Topics',
        'Views/Comments',
        'ViewModel/HomeViewModel',
        'ViewModel/TeamViewModel',
        'ViewModel/TopicsViewModel',
        'ViewModel/CommentsViewModel',
        'Lib/Require/Plugins/text!Templates/Header.html'
    ], function ($, _, backbone, marionette, homeView, teamView, topicView, commentView, homeVm, teamVm, topicVm, commentVm, templ) {
        var view = marionette.ItemView.extend({            
            template: templ, 
            // pullUpAction: function(myScroll, sportid, stateid) {
            //     teamVm.getModel(function(m) {
            //         var el = $('thelist');
                    
            //         el.empty();
            //         var li = document.createElement('li');

            //         m.get("Teams").each(function(item){    
            //             $(li).attr("data-teamid", item.get("_id"));
            //             $(li).append("<a href='javascript:void(0)'>" + item.get("name") + "</a>");
            //             el.append(li);
            //         });

            //         myScroll.refresh();
            //     }, sportid, stateid);
                
            // },
            // topicsClicked: function(e) {
            //     topicVm.getModel(function(m) {
            //         var v = new topicView({ model: m });
            //         LockerRoom.main.show(v);
            //     }, this.selectedTeamId);
            // },
            // commentsClicked: function(e) {
            //     commentVm.getModel(function(m) {
            //         var v = new commentView({ model: m });
            //         LockerRoom.main.show(v);
            //     }, this.selectedTopicId);
            // }
        });

        return view;
    });