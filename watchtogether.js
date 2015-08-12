if (Meteor.isClient) {
    // counter starts at 0
    Event = new EventEmitter();

    Session.setDefault('counter', 0);

    Template.hello.helpers({
        counter: function () {
            return Session.get('counter');
        }
    });

    Template.hello.events({
        'click button': function () {
            // increment the counter when button is clicked
            Session.set('counter', Session.get('counter') + 1);
        }
    });

    Template.video.onCreated(function () {
        var self = this;
        self.video = new ReactiveVar();
        self.myPlayer = new ReactiveVar();
        self.videoDep = new Tracker.Dependency;

    });

    Template.video.helpers({
        hasVideo: function () {
            return (Template.instance().video.get())
        },
        video: function () {
            return Template.instance().video.get();
        }
    });

    Template.video.destroyed = function(){
        //Event.removeListener('sendMsg', listener);
    }

    Template.video.events({
        'click #btnLoadVideo': function (e, t) {
            e.preventDefault();
            var url = $('#txtUrl').val();

            if(!url){
                var urls = [
                    'http://www.mediacollege.com/video-gallery/testclips/barsandtone.flv',
                    'http://www.mediacollege.com/video-gallery/testclips/20051210-w50s.flv',
                    'https://www.sit.auckland.ac.nz/wiki/images/9/9f/Sample.flv',
                    'http://sample-videos.com/video/flv/720/big_buck_bunny_720p_1mb.flv'
                ]
                var video = {
                    videoId : _.random(0,199),
                    url : urls[_.random(0,3)]
                }
                t.video.set(video);
                if(t.myPlayer.get()) t.myPlayer.get().dispose();
                $('#videoTag').html(Blaze.toHTMLWithData(Template.videoTag, t.video.get()));
                queryVideoPlayer(t);
            }
        }
    });


    function queryVideoPlayer(self){
        if(self.video.get()){
            var tpl = _.template('video_<%=id%>'),
                videoId = tpl({id : self.video.get().videoId});
            var hasVideoElement = self.find('video[id='+videoId+']');

            if(hasVideoElement){
                var myPlayer = new videojs(videoId);
                self.myPlayer.set(myPlayer);
                //Meteor.clearInterval(interval);
            }
        }
    }

}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
