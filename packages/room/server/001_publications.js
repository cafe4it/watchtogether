if (Meteor.isServer) {
    Meteor.publish('room_byId', function (id) {
        return Rooms.find({_id: id});
    });

    Meteor.publish('guest_byId', function (id) {
        return RoomsGuest.find({_id: id});
    });

    Meteor.publish('messages_byRoom', function (roomId) {
        return RoomMessages.find({roomId: roomId}, {limit: 50});
    })
}