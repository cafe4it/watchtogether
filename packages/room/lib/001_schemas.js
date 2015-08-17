Rooms = new Meteor.Collection('rooms');
RoomsGuest = new Meteor.Collection('rooms_guest');
RoomMessages = new Meteor.Collection('room_messages');
VideoStore = new Meteor.Collection('video_store');
VideosPlay = new Meteor.Collection('videos_play');

Rooms.helpers({
    isOwner : function(){
        var user = Meteor.users.findOne({_id : this.userId});
        if(user){
            return user._id === this.userId;
        }else{
            user = RoomsGuest.findOne({_id : this.userId});
            if(user){
                return user._id === this.userId;
            }
        }
    }
})

RoomMessages.helpers({
    getUser : function(){
        var user = Meteor.users.findOne({_id : this.userId}),
            room = Rooms.findOne({_id : this.roomId});
        if(user){
            return {
                fullName : user.profile.fullName,
                isUser : true,
                isOwner : (user._id === room.userId),
                color : (user._id === room.userId) ? 'red' : 'green'
            }
        }else{
            user = RoomsGuest.findOne({_id : this.userId});
            if(user){
                return {
                    fullName : user.fullName,
                    isUser : false,
                    isOwner : (user._id === room.userId),
                    color : (user._id === room.userId) ? 'red' : 'grey'
                }
            }
        }
    },
    decodeMessage : function () {
        return URI.decode(this.message);
    }
});

Users = Meteor.users;

Users.helpers({
    isAdminRoom : function (roomId) {
        var room = Rooms.findOne({_id : roomId});
        if(!room) return false;
        return (room.userId === this._id);
    }
});

VideosPlay.helpers({
    getRoom : function(){
        return Rooms.findOne({_id : this.roomId});
    },
    getVideo : function(){
        return VideoStore.findOne({_id : this.videoId})
    }
})