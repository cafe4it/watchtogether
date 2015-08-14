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

var scripts = [
    '//vjs.zencdn.net/4.12/video.js',
    '/videojs-plugins/videojs.caption.min.js'
]

var script = document.createElement('script');
script.type = 'text/javascript';
script.src = scripts[0];

head.appendChild(script);

Meteor.setTimeout(function(){
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = scripts[1];

    head.appendChild(script);
},100)