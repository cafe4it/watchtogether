Template.room_create.onCreated(function () {
    var self = this;
    self.returnPath = new ReactiveVar(FlowRouter.getQueryParam('returnPath'));
    self.autorun(function (c) {
        var roomId = Meteor.cookie.get('tubechat_roomId');
        var subscription = self.subscribe('room_byId', roomId);
        if (subscription.ready()) {
            var room = Rooms.findOne({_id: roomId});
            if (room) {
                c.stop();
                FlowRouter.go('room_home', {id: room._id});
            } else {
                Meteor.call('createRoom', function (err, rs) {
                    if(err) console.error(err);
                    var result = rs;
                    Meteor.cookie.set('tubechat_roomId', result.roomId);
                    Meteor.cookie.set('tubechat_userId' , result.user._id);
                    Meteor.loginWithPassword(result.user.email, result.user.email, function(err){
                        var path = FlowRouter.path('room_home', {id: (!self.returnPath.get()) ? result.roomId : self.returnPath.get()});
                        console.log(path);
                        window.location.href = path;
                    })
                })
            }

        }
    })
})

Template.room_create.helpers({
    message: function () {
        return (Template.instance().returnPath.get()) ? 'Fetch User & Room...' : 'Creating Room...';
    }
})