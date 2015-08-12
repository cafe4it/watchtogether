var head = document.getElementsByTagName('head')[0];

var style = document.createElement('link');
style.type = 'text/css';
style.rel = "stylesheet";
style.href = '//vjs.zencdn.net/4.12/video-js.css';

head.appendChild(style);

var script = document.createElement('script');
script.src = '//vjs.zencdn.net/4.12/video.js';

head.appendChild(script);