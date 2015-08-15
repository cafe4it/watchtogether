Rooms = new Meteor.Collection('rooms');
RoomsGuest = new Meteor.Collection('rooms_guest');
RoomMessages = new Meteor.Collection('room_messages');

RoomMessages.helpers({
    getUser : function(){
        var user = Meteor.users.findOne({_id : this.userId}),
            room = Rooms.findOne({_id : this.roomId});
        if(user){
            return {
                fullName : user.profile.fullName,
                isUser : true,
                color : (user._id === room.userId) ? 'red' : 'green'
            }
        }else{
            user = RoomsGuest.findOne({_id : this.userId});
            if(user){
                return {
                    fullName : user.fullName,
                    isUser : false,
                    color : (user._id === room.userId) ? 'red' : 'grey'
                }
            }
        }
    },
    decodeMessage : function () {
        return URI.decode(this.message);
    }
});