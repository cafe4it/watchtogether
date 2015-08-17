if (Meteor.isServer) {
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
        }
    })
}