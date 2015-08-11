if (Meteor.isClient) {
    // counter starts at 0
    Session.setDefault('counter', 0);

    Template.hello.helpers({
        counter: function () {
            return Session.get('counter');
        }
    });

    Template.hello.events({
        'click button': function () {
            // increment the counter when button is clicked
            Session.set('counter', Session.get('counter') + 1);
        }
    });

    Template.video.onCreated(function () {
        var self = this;
        self.video = new ReactiveVar();
    })

    Template.video.helpers({
        hasVideo: function () {
            return (Template.instance().video.get())
        },
        video: function () {
            return Template.instance().video.get();
        }
    })

    Template.video.events({
        'click #btnLoadVideo': function (e, t) {
            e.preventDefault();
            var url = $('#txtUrl').val();
            if(url){
                Meteor.call('Xvideos_byUrl',url, function(e, r){
                    t.video.set(r);
                })
            }
        }
    })
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
