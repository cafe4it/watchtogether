var roomRoutes = FlowRouter.group({
    prefix: '/room'
});

roomRoutes.route('/create', {
    name: 'room_create',
    action: function (q, p) {
        BlazeLayout.render('defaultLayout', {top: 'nav', main: 'room_create'});
    }
});

roomRoutes.route('/:id', {
    name: 'room_home',
    subscriptions : function(p, q){
        //var userId = Meteor.cookie.get('tubechat_userId') || Meteor.userId();
        //this.register('getGuest', Meteor.subscribe('guest_byParams', {_id : userId}));
        this.register('getRoom', Meteor.subscribe('room_byId', p.id));
        this.register('getMessages', Meteor.subscribe('messages_byRoom', p.id));

    },
    action: function (q, p) {
        BlazeLayout.render('defaultLayout', {top: 'nav', main: 'room_home'});
    }
});

roomRoutes.route('/', {
    triggersEnter: [function (context, redirect) {
        var roomId = Meteor.cookie.get('tubechat_roomId'),
            path = (roomId) ? FlowRouter.path('room_home', {id: roomId}) : FlowRouter.path('room_create', {}, {returnPath: roomId});
        redirect(path);
    }]
})