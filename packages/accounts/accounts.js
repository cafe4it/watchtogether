// Write your package code here!
if(Meteor.isServer){
    Meteor.startup(function(){

    });

    Meteor.publish(null, function (){
        return Meteor.roles.find({})
    });

    Meteor.publish(null, function (){
        return Meteor.users.find({})
    });

    Meteor.methods({
        autoCreateGuestUser : function(userId){
            try{
                var userId = userId || Meteor.cookie.get('tubechat_userId') || '';
                check(userId, String);
                var guest;
                var user = Meteor.users.findOne({_id : guest});
                if(user){
                    guest = user;
                }else{
                    var info = Fake.user({
                        fields: ['fullname','email']
                    });
                    var guestId = Accounts.createUser({
                        email : info.email,
                        password : info.email,
                        profile : {
                            fullName : info.fullname
                        }
                    });

                    Roles.addUsersToRoles(guestId, ['guest']);

                    guest = Meteor.users.findOne({_id : guestId});
                    //console.log(guest);
                    //if(Meteor.cookie.has('tubechat_userId')) Meteor.cookie.remove('tubechat_userId');
                }
                return {
                    _id : guest._id,
                    email : guest.emails[0].address
                };
            }catch(ex){
                console.error('method : autoCreateGuestUser, has error :' + ex)
            }
        }
    })
}