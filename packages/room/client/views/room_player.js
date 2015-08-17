Template.room_player.onCreated(function(){
    var self = this;
    self.myPlayer = new ReactiveVar();
    self.videoHtml = new ReactiveVar();
    self.videoNow = new ReactiveVar();
    self.videoTag = new ReactiveVar();
    var html = Blaze.toHTML(Template.video_default);
    self.videoHtml.set(html);
    self.autorun(function(c){
        var subsPlayNow = self.subscribe('video_play_now',self.data.roomId);
        if(subsPlayNow.ready()){
            var videoPlayNow = VideosPlay.findOne({roomId : self.data.roomId});
            if(videoPlayNow){
                var subsVideo = self.subscribe('video_byId',videoPlayNow.videoId);
                if(subsVideo.ready()){
                    var videoNow = videoPlayNow.getVideo();
                    if(videoNow){
                        self.videoNow.set(videoNow);
                        html = Blaze.toHTMLWithData(Template.video, self.videoNow.get());
                        if(html){
                            $('.player-container > div').html('');
                            self.myPlayer.set(undefined);
                            self.videoHtml.set(html);
                        }
                    }
                }
            }
        }
    })
});

Template.room_player.helpers({
    video : function(){
        $('.player-container > div').html('');
        return Template.instance().videoHtml.get();
    }
});

Template.room_player.rendered = function(){
    var self = Template.instance();
    $(document).ready(function(){
        var interval = Meteor.setInterval(function(){
            var videoTag = document.getElementById("myVideoPlayer");
            if(videoTag){
                self.videoTag.set(videoTag);
                Meteor.clearInterval(interval);
            }
        },500)
        self.autorun(function(){
            if(self.videoNow.get() && self.videoTag.get()){
                if(!self.myPlayer.get()){
                    videojs(self.videoTag.get()).ready(function(){
                        var myPlayer = this;
                        if(myPlayer){
                            self.myPlayer.set(myPlayer);
                            controlsPlayer(self);
                        }
                    })
                }
            }
        })
    })
}

function controlsPlayer(self){
    var myPlayer = self.myPlayer.get();
    myPlayer.ready(function(){
        myPlayer.play();
        myPlayer.on('durationchange',function(){
            var duration = Math.floor(+myPlayer.duration()) + 1;
            if(duration || duration > 0){
                Meteor.call('updateDurationOfVideo',self.videoNow.get()._id, duration);
            }
        })
    })
}