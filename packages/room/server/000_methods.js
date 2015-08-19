if (Meteor.isServer) {
    playerStream = new Meteor.Stream('player');

    playerStream.permissions.write(function() {
        return true;
    });

    playerStream.permissions.read(function() {
        return true;
    });

    Meteor.methods({
        'createRoom': function () {
            try {
                Meteor._sleepForMs(2000);
                var userId = Meteor.call('createGuestUser');
                var roomId = Rooms.insert({
                    name : 'Temporary Room',
                    userId: userId,
                    updatedAt: new Date
                });
                return {
                    roomId: roomId,
                    userId: userId
                };
            } catch (ex) {
                console.error(ex)
            }
        },
        'createGuestUser': function () {
            if (!Meteor.userId()) {
                var fake = Fake.user({
                    fields: ['fullname']
                });
                var guestId = RoomsGuest.insert({
                    fullName: fake.fullname,
                    updatedAt: new Date
                });

                return guestId;
            }
            return Meteor.userId();
        },
        changeGuestName: function (guestId, fullName) {
            try {
                check(guestId, String);
                check(fullName, String);

                RoomsGuest.update({_id: guestId}, {
                    $set: {
                        fullName: fullName,
                        updatedAt: new Date
                    }
                })
                return 'SUCCESS';
            } catch (ex) {
                console.error('method : changeGuestName, has error :' + ex)
            }
        },
        sendMessage: function (roomId, userId, msg) {
            try{
                check(roomId, String);
                check(userId, String);
                check(msg, String);

                var room = Rooms.findOne({_id : roomId}),
                    user = (this.userId) ? Meteor.user() : RoomsGuest.findOne({_id : userId});
                /*var msg = sanitizeHtml(msg, {
                    allowedTags: []
                });*/
                var msg = URI.encode(msg);
                if(!msg || _.isEmpty(msg)) return 'FAILED';
                if(room && user){
                    RoomMessages.insert({
                        roomId : room._id,
                        userId : user._id,
                        message : msg,
                        updatedAt : new Date
                    });

                    return 'SUCCESS';
                }
            }catch(ex){
                console.error('method : sendMessage, has error :' + ex)
            }
        },
        clearMessages : function (roomId) {
            try{
                check(roomId, String);
                var room = Rooms.findOne({_id : roomId});
                if(room){

                }
            }catch(ex){
                console.error('method : clearMessages, has error(s) :' + ex);
            }
        },
        searchAndAddVideoToStore : function(url){
            try{
                check(url, String);
                var video = VideoStore.findOne({urls : url});
                if(!video){
                    var rs = Meteor.call('Xvideos_byUrl',url);
                    if(rs){
                        rs = _.extend(rs, {updatedAt : new Date});
                        var id = VideoStore.insert(rs);
                        video = VideoStore.findOne({_id : id});
                    }
                }
                return video;
            }catch(ex){
                console.error('method : addVideoToStore, has error(s) :' + ex)
            }
        },
        updateDurationOfVideo : function(videoId, duration){
            try{
                check(videoId, String);
                check(duration, Number);
                var video = VideoStore.findOne({_id : videoId, duration :{$exists : false}});
                if(video){
                    VideoStore.update({_id : videoId},{$set :{
                        duration : duration
                    }});
                }
            }catch(ex){
                console.error('method : updateDurationOfVideo, has error(s) :' + ex)
            }
        },
        playVideoNow : function(roomId, videoId){
            try{
                check(roomId, String);
                check(videoId, String);

                var room = Rooms.findOne({_id : roomId}),
                    video = VideoStore.findOne({_id : videoId});
                if(room && video && room.isOwner()){
                    VideosPlay.remove({roomId : room._id});
                    VideosPlay.insert({
                        roomId : room._id,
                        videoId : video._id,
                        updatedAt : new Date
                    });
                    return 'SUCCESS';
                }
            }catch(ex){
                console.error('method : playVideoNow, has error(s) :' + ex)
            }
        },
        PlayNowUpdateTime : function(roomId, videoId, timer){
            try{
                check(roomId, String);
                check(videoId, String);
                check(timer, Date);
                var room = Rooms.findOne({_id : roomId}),
                    video = VideoStore.findOne({_id : videoId});
                if(room && video){
                    VideosPlay.update({roomId : room._id, videoId : video._id},{
                        $set :{
                            playedAt : timer
                        }
                    });
                    return 'SUCCESS';
                }
            }catch(ex){
                console.error('method : PlayNowUpdateTime, has error(s) :' + ex)
            }
        },
        removePlayNow : function(roomId, videoId){
            try{
                check(roomId, String);
                check(videoId, String);
                var room = Rooms.findOne({_id : roomId}),
                    video = VideoStore.findOne({_id : videoId});
                if(room && video){
                    VideosPlay.remove({roomId : room._id, videoId : video._id});
                    return 'SUCCESS'
                }
            }catch(ex){
                console.error('method : removePlayNow, has error(s) :' + ex)
            }
        }
    })

    Meteor.methods({
        addVideoExampleToStore : function(video){
            var video = _.extend(video, {updatedAt : new Date});
            var id = VideoStore.insert(video);
            return id;
        },
        addVideoPlayNowExample : function(roomId, videoId){
            VideosPlay.upsert({roomId : roomId},{$set :{
                roomId : roomId,
                videoId : videoId,
                updatedAt : new Date
            }})
        }
    })
}