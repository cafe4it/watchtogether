Template.room_home.onCreated(function(){
    var self = this;
    self.autorun(function(c){
        var userId = Meteor.cookie.get('tubechat_userId') || Meteor.userId();
        if (!userId) {
            FlowRouter.go(FlowRouter.path('room_create', {}, {returnPath: FlowRouter.getParam('id')}))
        }
    })
});

Template.room_home.rendered = function(){
    $(document).ready(function(){
        $('#modal_playlist')
            .modal({
                onShow : function(){
                    $('#modal_playlist .menu .item').tab();
                }
            })
            .modal('attach events', '#btnPlaylist', 'show');
    })
}

Template.room_home.helpers({
    room : function(){
        return {
            id : FlowRouter.getParam('id')
        }
    }
})