Template.room_menu.onCreated(function () {
    var self = this;
    self.user = ReactiveVar();
    self.autorun(function (c) {
        if (Meteor.user()) {
            self.user.set({
                _id: Meteor.user()._id,
                fullName: Meteor.user().profile.fullName
            });
        }
        if (!self.user.get()) {
            var guestId = Meteor.cookie.get('tubechat_userId');
            var guestSubs = self.subscribe('guest_byId', guestId);
            if (guestSubs.ready()) {
                var guest = RoomsGuest.findOne({_id: guestId});
                self.user.set(guest);
            }
        }
    })
})

Template.room_menu.helpers({
    user: function () {
        return Template.instance().user.get();
    }
})

Template.room_menu.events({
    'click #btnChangeYourName': function (e, t) {
        e.preventDefault();
        var template = t;
        $('#modal_changeYourName')
            .modal({
                onApprove: function () {
                    var txtFullName = $('#modal_changeYourName .txtFullName').val();
                    if (!Meteor.userId()) {
                        var guest = template.user.get();
                        Meteor.call('changeGuestName', guest._id, txtFullName, function (err, rs) {
                            if(rs === 'SUCCESS'){
                                sAlert.success("Change your Name success!");
                            }
                        })
                    }
                }
            })
            .modal('show');
    }
});