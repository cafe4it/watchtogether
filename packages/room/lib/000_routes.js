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
/*    triggersEnter: [function (context, redirect) {
        var userId =Meteor.cookie.get('tubechat_userId');
        console.log(userId)
        if (!userId) {
            redirect(FlowRouter.path('room_create', {}, {returnPath: FlowRouter.getParam('id')}));
        }
    }],*/
    name: 'room_home',
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