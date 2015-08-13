if(Meteor.isServer){
    Meteor.methods({
        'createRoom' : function(){
            try{
                Meteor._sleepForMs(2000);
                var roomId = Rooms.insert({
                    userId : Meteor.userId() || 'guest',
                    updatedAt : new Date
                });
                return roomId;
            }catch(ex){
                console.error(ex)
            }
        }
    })
}