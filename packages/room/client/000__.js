/**
 * Created by nxcong on 18/08/2015.
 */
if(Meteor.isClient){
    Event = new EventEmitter();
    var listener = function(obj) {
        switch(obj.event){
            case 'ended' :
                console.log('player-end');
                break;
            case 'started':
                console.log('player-started');
                break;
        }
    };

    Event.on('playerEvents', listener);
}
