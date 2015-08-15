Template.chatbox.onCreated(function () {
    var self = this;
    self.user = new ReactiveVar();
    self.messages = new ReactiveVar();
    self.chatBodyHeight = new ReactiveVar();
    self.autorun(function (c) {
        //console.log(c.firstRun, self.isFirstLoad.get())
        var roomId = self.data.roomId || FlowRouter.getParam('id');

        var msgSubs = FlowRouter.subsReady("getMessages"),
            roomSubs = FlowRouter.subsReady("getRoom");
        if (msgSubs && roomSubs) {
            var messages = RoomMessages.find({roomId: roomId}, {sort: {updatedAt: 1}});
            messages.observe({
                added : function(){
                    setScroll(self);
                }
            });

            self.messages.set(messages);

            var messageHasUserIds = _.map(self.messages.get().fetch(), function (m) {
                return m.userId;
            });

            self.subscribe('guest_byParams', {_id: {$in: messageHasUserIds}});

        }

    });
});

Template.chatbox.rendered = function () {
    $(document).ready(function () {
        var self = Template.instance();

        self.autorun(function (c) {
            autoScroll(self);
        })
    })
}


Template.chatbox.helpers({
    messages: function () {
        return Template.instance().messages.get();
    }
});

Template.chatbox.events({
    'keyup #txtTextMsg': function (e, t) {
        e.preventDefault();
        if (e.keyCode === 13) {
            var msg = e.target.value || $('#txtTextMsg').val(),
                roomId = t.data.roomId || FlowRouter.getParam('id'),
                userId = Meteor.cookie.get('tubechat_userId') || Meteor.userId();
            Meteor.call('sendMessage', roomId, userId, msg, function (err, r) {
                if (r === 'SUCCESS') {
                    e.target.value = '';
                    $('#txtTextMsg').val('');
                    setScroll(t)
                }
            })
        }
    }
});

function setScroll(t) {
    var t = t || Template.instance();
    var height = $('.chat-container .chat-body')[0].scrollHeight;
    t.chatBodyHeight.set(height);
}

function autoScroll(t) {
    var t = t || Template.instance();
    var scrollHeight = t.chatBodyHeight.get();
    if (!scrollHeight) return;
    if (scrollHeight > 485) {
        $('.chat-container .chat-body')[0].scrollTop = scrollHeight;
    }
}
