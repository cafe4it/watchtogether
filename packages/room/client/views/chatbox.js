Template.chatbox.onCreated(function(){
    var self = this;
    self.user = new ReactiveVar();
    self.messages = new ReactiveVar();
    self.autorun(function(c){
        var roomId = self.data.roomId || FlowRouter.getParam('id');
        var msgSubs = self.subscribe('messages_byRoom', roomId),
            roomSubs = self.subscribe('room_byId',roomId);
        if(msgSubs.ready() && roomSubs.ready()){
            var messages = RoomMessages.find({roomId : roomId},{limit : 50}).fetch() || [];
            self.messages.set(messages);
        }

        var messageHasUserIds = _.map(self.messages.get(),function(m){
            return m.userId;
        });

        self.subscribe('guest_byParams',{_id : {$in : messageHasUserIds}});
        /*if(Meteor.userId()){
            self.user.set({
                _id : Meteor.userId(),
                fullName : Meteor.user().profile.fullName
            });
        }else{
            var guestId = Meteor.cookie.get('tubechat_userId');

            var guestSubs = self.subscribe('guest_byId',guestId);
            if(guestSubs.ready()){
                var guest = RoomsGuest.findOne({_id : guestId});
                self.user.set(guest);
            }
        }*/


    })
});

Template.chatbox.helpers({
    user : function(){
        return Template.instance().user.get();
    },
    messages : function(){
        return Template.instance().messages.get();
    }
});

Template.chatbox.events({
    'keyup #txtTextMsg' : function(e,t){
        e.preventDefault();
        if(e.keyCode === 13){
            var msg = e.target.value || $('#txtTextMsg').val(),
                roomId = t.data.roomId || FlowRouter.getParam('id'),
                userId = Meteor.cookie.get('tubechat_userId') || Meteor.userId();
            Meteor.call('sendMessage',roomId, userId, msg, function(e, r){
                if(r === 'SUCCESS'){
                    $('#txtTextMsg').val('');
                }
            })
        }
    }
})