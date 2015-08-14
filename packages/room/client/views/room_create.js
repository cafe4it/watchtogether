Template.room_create.onCreated(function () {
    var self = this;
    self.autorun(function(c){
        var roomId = Meteor.cookie.get('tubechat_roomId');
        var subscription = self.subscribe('room_byId',roomId);
        if(subscription.ready()){
            var room = Rooms.findOne({_id : roomId});
            if(room){
                c.stop();
                FlowRouter.go('room_home', {id : room._id});
            }else{
                Meteor.call('createRoom', function (err, rs) {
                    Meteor.cookie.set('tubechat_roomId', rs.roomId);
                    Meteor.cookie.set('tubechat_userId',rs.userId)
                    var path = FlowRouter.path('room_home', {id : rs.roomId});
                    window.location.href = path;
                })
            }

        }
    })
})