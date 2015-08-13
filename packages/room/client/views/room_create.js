Template.room_create.onCreated(function () {
    var self = this;
    self.autorun(function(c){
        var roomId = Meteor.cookie.get('1hand_roomId');
        var subscription = self.subscribe('room_byId',roomId);
        if(subscription.ready()){
            var room = Rooms.findOne({_id : roomId});
            if(room){
                c.stop();
                FlowRouter.go('room_home', {id : room._id});
            }else{
                Meteor.call('createRoom', function (err, rs) {
                    Meteor.cookie.set('1hand_roomId', rs);
                    var path = FlowRouter.path('room_home', {id : rs});
                    window.location.href = path;
                })
            }

        }
    })
})