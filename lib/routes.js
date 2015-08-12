if(Meteor.isClient){
    BlazeLayout.setRoot('body');
}

FlowRouter.route('/',{
    name : 'home',
    action : function(q, p){
        BlazeLayout.render('defaultLayout', {top : 'nav', main : 'home'})
    }
})