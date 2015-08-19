var head = document.getElementsByTagName('head')[0];

var styles = [
    '//vjs.zencdn.net/4.12/video-js.css',
    '/videojs-plugins/videojs.caption.min.css'
]

_.each(styles, function(href){
    var style = document.createElement('link');
    style.type = 'text/css';
    style.rel = "stylesheet";
    style.href = href;

    head.appendChild(style);
});



var script = document.createElement('script');
script.type = 'text/javascript';
script.src = '/video.js';

head.appendChild(script);

Meteor.setTimeout(function(){
    var scripts = [
        '/videojs-plugins/videojs.caption.min.js',
        '/videojs-plugins/videojs.disableProgress.js'
    ]
    _.each(scripts,function(s){
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = s;
        head.appendChild(script);
    })

},300)

/*
$(document).ready(function(){
    $.getScript(scripts[0],function(data, textStatus, jqxhr){
        console.log(data, textStatus)
        if(textStatus === 'success'){

        }
    })
})
*/

