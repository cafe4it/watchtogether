var roomRoutes = FlowRouter.group({
    prefix : '/room'
});

roomRoutes.route('/create',{
    name : 'room_create',
    action : function (q, p) {
        BlazeLayout.render('defaultLayout',{top : 'nav', main : 'room_create'});
    }
});

roomRoutes.route('/:roomId',{
    name : 'room_home',
    action : function(q, p){
        BlazeLayout.render('defaultLayout',{top : 'nav', main : 'room_home'});
    }
})
