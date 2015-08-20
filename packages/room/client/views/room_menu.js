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
                    if (Meteor.userId()) {
                        Meteor.call('changeGuestName', Meteor.userId(), txtFullName, function (err, rs) {
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