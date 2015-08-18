Template.room_player.onCreated(function () {
    var self = this;
    self.videoPlayNow = new ReactiveVar(undefined);
    self.renderHTML = new ReactiveVar(undefined);
    self.showLoading = new ReactiveVar(true);
    self.autorun(function () {
        var roomId = self.data.roomId || FlowRouter.getParam('id');
        if (self.subscribe('video_play_now', roomId).ready()) {
            var videoPlayNow = VideosPlay.findOne({roomId: roomId});
            if (videoPlayNow) {
                if (self.subscribe('video_byId', videoPlayNow.videoId).ready()) {
                    self.videoPlayNow.set(videoPlayNow);
                    var videoNow = self.videoPlayNow.get().getVideo();
                    self.showLoading.set((!videoNow));
                    self.renderHTML.set(Blaze.toHTMLWithData(Template.video, videoNow));
                }
            }
        }else{
            self.renderHTML.set(undefined);
            self.videoPlayNow.set(undefined);
            self.showLoading.set(true);
            if(player) player.dispose();
            $('#player').html(Blaze.toHTML(Template.video_default));
        }
    })
})
var player;
Template.room_player.rendered = function () {
    var self = Template.instance();
    $(document).ready(function () {
        self.autorun(function (c) {
            if (player) {
                player.dispose();
            }
            var videoPlayNow = self.videoPlayNow.get(),
                HTML = self.renderHTML.get();
            if ((videoPlayNow !== undefined) && (HTML !== undefined)) {
                $('#player').html(HTML);
                videojs(videoPlayNow.videoId, {}).ready(function () {
                    player = this;

                    player.disableProgress({
                        autoDisable: true
                    });

                    player.on('loadstart','waiting','progress',function(){
                        self.showLoading.set(true);
                    });

                    player.on('loadedmetadata','loadeddata','loadedalldata', function(){
                        self.showLoading.set(false);
                    })

                    player.on('error', function (err) {
                        if (err) console.log(err);
                    });

                    player.on('durationchange',function(){
                        if(videoPlayNow !== undefined && player !== undefined){
                            var videoNow = videoPlayNow.getVideo();
                            if(!videoNow.duration){
                                var duration = Math.floor(+player.duration())+1;
                                Meteor.call('updateDurationOfVideo', videoNow._id ,duration);
                            }
                        }
                    });

                    player.on('firstplay',function(){
                        if(!videoPlayNow.playedAt){
                            Meteor.call('PlayNowUpdateTime', videoPlayNow.roomId, videoPlayNow.videoId, new Date);
                        }
                    })

                    player.on('play', function () {
                        if(videoPlayNow !== undefined){
                            var p = player;
                            var timeout = Meteor.setTimeout(function(){
                                var currentTime = moment().diff(videoPlayNow.playedAt, 'seconds'),
                                    duration = (videoPlayNow.getVideo()) ? videoPlayNow.getVideo().duration : 0;
                                (currentTime < duration) ? p.currentTime(currentTime) : p.currentTime(duration);
                                Meteor.clearTimeout(timeout);
                            },1000)
                        }
                    });

                    player.on('pause', function () {
                        if (player.pause()) player.play();
                    });

                    player.on('ended', function(){
                        Meteor.call('removePlayNow', videoPlayNow.roomId, videoPlayNow.videoId,function(err, rs){
                            if(rs === 'SUCCESS'){
                                window.location.href = FlowRouter.path('room_home',{id : self.data.roomId});
                            }
                        });
                    })
                })
            }else{

            }
        })
    })
}

Template.room_player.helpers({
    isReady: function () {
        return (Template.instance().showLoading.get()) ? 'display:none' : '';
    },
    isNotReady: function () {
        return (Template.instance().showLoading.get()) ? '' : 'display : none';
    }
});