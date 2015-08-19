/**
 * Created by nxcong on 18/08/2015.
 */
if(Meteor.isClient){
    playerStream = new Meteor.Stream('player');

    playerStream.on('updatePlayer', function (data) {

        if (!window.videoPlayNow || !data) return;
        if (data.videoPlayNow.roomId !== window.videoPlayNow.roomId) return;
        if (data.videoPlayNow.videoId !== window.videoPlayNow.videoId) return;

        var player = window.player;
        if (player) {
            if (player.duration() > 0 && data.currentTime > player.duration()) return;

            var waitting = player.currentTime() < 0;

            if (waitting) player.currentTime(0);

            var time = data.currentTime,
                diff = (time - player.currentTime()) || time,
                accuracy = 2;
            if (diff > accuracy) {
                player.currentTime(time);
            } else if (diff < -accuracy) {
                player.currentTime(time + 1);
            }
        }
    })

    playerStream.on('sendVideoUpdate', function(data){

    })
}
