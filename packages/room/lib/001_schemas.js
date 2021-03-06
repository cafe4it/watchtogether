Rooms = new Meteor.Collection('rooms');
RoomsGuest = new Meteor.Collection('rooms_guest');
RoomMessages = new Meteor.Collection('room_messages');
VideoStore = new Meteor.Collection('video_store');
VideosPlay = new Meteor.Collection('videos_play');

Rooms.helpers({
    isOwner : function(userId){
        var userId = userId || Meteor.userId() ||Meteor.cookie.get('tubechat_userId') || '';
        var user = Meteor.users.findOne({_id : userId});
        var result = false;
        if(user){
            result = (user._id === this.userId);
        }
        return result;
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
                color : (user._id === room.userId) ? 'red' : (user.isGuest()) ? 'grey' : 'green'
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
    },
    getFullName : function(){
        return this.profile.fullName
    },
    isGuest : function(){
        return Roles.userIsInRole(this._id, ['guest']);
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