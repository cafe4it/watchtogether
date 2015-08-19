Template.room_player.onCreated(function () {
    var self = this;
    self.videoPlayNow = new ReactiveVar(undefined);
    //self.renderHTML = new ReactiveVar(Blaze.toHTML(Template.video_default));
    self.showLoading = new ReactiveVar(true);
    self.isOwnerRoom = new ReactiveVar(false);

    self.autorun(function () {
        var roomId = self.data.roomId || FlowRouter.getParam('id'),
            userId = Meteor.cookie.get('tubechat_userId') || Meteor.userId();

        var subsGuest = self.subscribe('guest_byParams', {_id : userId}),
            subsRoom = self.subscribe('room_byId',roomId);

        if (self.subscribe('video_play_now', roomId).ready()) {
            var videoPlayNow = VideosPlay.findOne({roomId: roomId});
            if (videoPlayNow) {
                if (self.subscribe('video_byId', videoPlayNow.videoId).ready()) {
                    self.videoPlayNow.set(videoPlayNow);
                    var videoNow = self.videoPlayNow.get().getVideo();
                    self.showLoading.set((!videoNow));
                    //window.loadMediaPlayer(videoNow);
                    //self.renderHTML.set(Blaze.toHTMLWithData(Template.video, _.extend(videoNow, {roomId : roomId})));
                }

                if(subsRoom.ready() && subsGuest.ready()){
                    var room = Rooms.findOne({_id : roomId});
                    self.isOwnerRoom.set(room.isOwner(userId));
                }
            }
        }
    })
})

Template.room_player.rendered = function () {
    var self = Template.instance();
    $(document).ready(function () {
        self.autorun(function(c){
            var videoPlayNow = self.videoPlayNow.get(),
                isOwner = self.isOwnerRoom.get()

            if(videoPlayNow && isOwner){
                var data = _.extend(videoPlayNow.getVideo(), {isOwner : isOwner});
                window.loadMediaPlayer(data);

                //c.stop();
            }
        })

        /*self.autorun(function (c) {
            if (window.player) {
                window.player.dispose();
            }
            var videoPlayNow = self.videoPlayNow.get(),
                HTML = self.renderHTML.get(),
                isOwner = self.isOwnerRoom.get();
            if ((videoPlayNow !== undefined) && (HTML !== undefined) && (isOwner !== undefined)) {
                $('#player').html(HTML);
                videojs('myVideoPlayer', {}).ready(function () {
                    window.player = this;
                    window.videoPlayNow = videoPlayNow;


                    this.on('loadstart', 'waiting', 'progress', function () {
                        self.showLoading.set(true);
                    });

                    this.on('loadedmetadata', 'loadeddata', 'loadedalldata', function () {
                        self.showLoading.set(false);
                    })

                    this.on('error', function (err) {
                        if (err) console.log(err);
                    });

                    this.on('durationchange', function () {
                        if (videoPlayNow !== undefined && this !== undefined) {
                            var videoNow = videoPlayNow.getVideo();
                            if (!videoNow.duration) {
                                var duration = Math.floor(+this.duration()) + 1;
                                Meteor.call('updateDurationOfVideo', videoNow._id, duration);
                            }
                        }
                    });

                    player.on('seeked', function () {
                        $('.vjs-waiting').removeClass('vjs-waiting');
                        $('.vjs-loading-spinner').removeClass('vjs-loading-spinner');
                    });

                    this.on('pause', function () {
                        if (this.pause()) this.play();
                    });

                    this.on('play',function(){
                        if(isOwner) {
                            var data = {
                                videoPlayNow : self.videoPlayNow.get(),
                                currentTime : window.player.currentTime()
                            }
                            playerStream.emit('updatePlayer', data);
                        }
                    })

                    this.on('ended', function () {
                        Meteor.call('removePlayNow', videoPlayNow.roomId, videoPlayNow.videoId, function (err, rs) {
                            if (rs === 'SUCCESS') {
                                window.location.href = FlowRouter.path('room_home', {id: self.data.roomId});
                            }
                        });
                    })

                    mediaPlayerUpdate(self);
                })
            } else {

            }
        })*/
    })
}

var interval ;
function mediaPlayerUpdate(self) {
    var isOwner = self.isOwnerRoom.get();
    if(isOwner){
        if(interval) Meteor.clearInterval(interval);

        interval = Meteor.setInterval(function(){
            var data = {
                videoPlayNow : self.videoPlayNow.get(),
                currentTime : window.player.currentTime()
            }
            playerStream.emit('updatePlayer',data);
        },5000)
    }
}

Template.room_player.helpers({
    isReady: function () {
        return (Template.instance().showLoading.get()) ? 'display:none' : '';
    },
    isNotReady: function () {
        return (Template.instance().showLoading.get()) ? '' : 'display : none';
    }
});

Template.room_player.destroyed = function(){
    if(window.PLAYER || window.PLAYER.player){
        window.PLAYER.player.dispose();
        window.PLAYER = undefined;
    }
}