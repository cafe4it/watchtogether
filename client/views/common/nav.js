/**
 * Created by nxcong on 13/08/2015.
 */
Template.nav.helpers({
    hasOwnRoom : function () {
        return (Meteor.cookie.get('1hand_roomId'));
    },
    roomId : function () {
        return Meteor.cookie.get('1hand_roomId')
    }
});

Template.nav.events({
    'click .fixed.launch.button' : function(e,t){
        e.preventDefault();
        $('.ui.sidebar')
            .sidebar('toggle')
        ;
    }
})