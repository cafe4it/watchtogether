var roomRoutes = FlowRouter.group({
    prefix : '/room'
});

roomRoutes.route('/create',{
    name : 'room_create',
    action : function (q, p) {
        BlazeLayout.render('defaultLayout',{top : 'nav', main : 'room_create'});
    }
});

roomRoutes.route('/:id',{
    name : 'room_home',
    action : function(q, p){
        BlazeLayout.render('defaultLayout',{top : 'nav', main : 'room_home'});
    }
});

roomRoutes.route('/',{
    triggersEnter : [function(context, redirect) {
        var roomId = Meteor.cookie.get('1hand_roomId'),
            path = FlowRouter.path('room_home',{id : roomId});
        redirect(path);
    }]
})