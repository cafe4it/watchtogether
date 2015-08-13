if(Meteor.isServer){
    Meteor.publish('room_byId',function(id){
        return Rooms.find({_id : id});
    })
}