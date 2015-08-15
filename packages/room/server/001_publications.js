if (Meteor.isServer) {
    Meteor.publish('room_byId', function (id) {
        return Rooms.find({_id: id});
    });

    Meteor.publish('guest_byId', function (id) {
        return RoomsGuest.find({_id: id});
    });

    Meteor.publish('guest_byParams', function (params) {
        return RoomsGuest.find(params);
    });

    Meteor.publish('messages_byRoom', function (roomId) {
        //Meteor._sleepForMs(2000);
        return RoomMessages.find({roomId: roomId}, {sort : {updatedAt : -1},limit: 50});
    })
}