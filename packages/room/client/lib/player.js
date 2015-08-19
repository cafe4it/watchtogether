function waitUntilDefined(obj, key, fn) {
    if(typeof obj[key] === "undefined") {
        setTimeout(function () {
            waitUntilDefined(obj, key, fn);
        }, 100);
        return;
    }
    fn();
}
(function () {
    var Player, VideoJSPlayer,
        extend = function (child, parent) {
            for (var key in parent) {
                if (hasProp.call(parent, key)) child[key] = parent[key];
            }
            function ctor() {
                this.constructor = child;
            }

            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        },
        hasProp = {}.hasOwnProperty;

    window.Player = Player = (function () {
        function Player(data) {
            if (!(this instanceof Player)) {
                return new Player(data);
            }
            this.setMediaProperties(data);
            this.paused = false;
        }

        Player.prototype.load = function (data) {
            return this.setMediaProperties(data);
        };

        Player.prototype.setMediaProperties = function (data) {
            this.mediaId = data._id;
            this.mediaType = data.type;
            return this.mediaLength = data.duration;
        };

        Player.prototype.play = function () {
            return this.paused = false;
        };

        Player.prototype.pause = function () {
            return this.paused = true;
        };

        Player.prototype.seekTo = function (time) {
        };

        Player.prototype.setVolume = function (volume) {
        };

        Player.prototype.getTime = function (cb) {
            return cb(0);
        };

        Player.prototype.isPaused = function (cb) {
            return cb(this.paused);
        };

        Player.prototype.getVolume = function (cb) {
            return cb(VOLUME);
        };

        return Player;

    })();


    waitUntilDefined(window, 'videojs', (function (_this) {
        return function () {
            return videojs.options.flash.swf = '/video-js.swf';
        };
    })(this));

    window.VideoJSPlayer = VideoJSPlayer = (function (superClass) {
        extend(VideoJSPlayer, superClass);

        function VideoJSPlayer(data) {
            if (!(this instanceof VideoJSPlayer)) {
                return new VideoJSPlayer(data);
            }
            this.setMediaProperties(data);
            this.loadPlayer(data);
        }

        VideoJSPlayer.prototype.loadPlayer = function (data) {
            return waitUntilDefined(window, 'videojs', (function (_this) {
                return function () {
                    var video;
                    video = $('<video/>').addClass('video-js vjs-default-skin').attr({
                        width: '99.9%',
                        height: '488px'
                    });
                    removeOld(video);
                    /*sources = sortSources(data.meta.direct);
                    if (sources.length === 0) {
                        console.error('VideoJSPlayer::constructor(): data.meta.direct has no sources!');
                        _this.mediaType = null;
                        return;
                    }
                    sources.forEach(function (source) {
                        return $('<source/>').attr({
                            src: source.src,
                            type: source.type,
                        }).appendTo(video);
                    });*/
                    $('<source/>').attr({
                        src: data.src,
                        type: data.type,
                    }).appendTo(video);

                    _this.player = videojs(video[0], {
                        autoplay: true,
                        controls: true
                    });
                    return _this.player.ready(function () {
                        //_this.setVolume(VOLUME);
                        _this.player.on('ended', function () {
                            /*if (CLIENT.leader) {
                                return socket.emit('playNext');
                            }*/
                        });
                        _this.player.on('pause', function () {
                            _this.paused = true;
                            if(data.isOwner) {
                                //return sendVideoUpdate();
                            }
                        });
                        _this.player.on('play', function () {
                            _this.paused = false;
                            if (data.isOwner) {
                                //return sendVideoUpdate();
                            }
                        });
                        return _this.player.on('seeked', function () {
                            return $('.vjs-waiting').removeClass('vjs-waiting');
                        });
                    });
                };
            })(this));
        };

        VideoJSPlayer.prototype.load = function (data) {
            this.setMediaProperties(data);
            return this.loadPlayer(data);
        };

        VideoJSPlayer.prototype.play = function () {
            this.paused = false;
            if (this.player && this.player.readyState() > 0) {
                return this.player.play();
            }
        };

        VideoJSPlayer.prototype.pause = function () {
            this.paused = true;
            if (this.player && this.player.readyState() > 0) {
                return this.player.pause();
            }
        };

        VideoJSPlayer.prototype.seekTo = function (time) {
            if (this.player && this.player.readyState() > 0) {
                return this.player.currentTime(time);
            }
        };

        VideoJSPlayer.prototype.setVolume = function (volume) {
            if (this.player) {
                return this.player.volume(volume);
            }
        };

        VideoJSPlayer.prototype.getTime = function (cb) {
            if (this.player && this.player.readyState() > 0) {
                return cb(this.player.currentTime());
            } else {
                return cb(0);
            }
        };

        VideoJSPlayer.prototype.getVolume = function (cb) {
            if (this.player && this.player.readyState() > 0) {
                if (this.player.muted()) {
                    return cb(0);
                } else {
                    return cb(this.player.volume());
                }
            } else {
                return cb(VOLUME);
            }
        };

        return VideoJSPlayer;

    })(Player);

    window.loadMediaPlayer = function (data) {
        var e;
        try {
            return window.PLAYER = new VideoJSPlayer(data);
        } catch (_error) {
            e = _error;
            return console.error(e);
        }
    };

    window.handleMediaUpdate = function (data) {
        var PLAYER, waiting;
        PLAYER = window.PLAYER;
        if (typeof PLAYER.mediaLength === 'number' && PLAYER.mediaLength > 0 && data.currentTime > PLAYER.mediaLength) {
            return;
        }
        waiting = data.currentTime < 0;
        if (data.id && data.id !== PLAYER.mediaId) {
            if (data.currentTime < 0) {
                data.currentTime = 0;
            }
            PLAYER.load(data);
            PLAYER.play();
        }
        if (waiting) {
            PLAYER.seekTo(0);
            PLAYER.pause();
            return;
        }

        if (data.isOwner) {
            return;
        }

        if (data.paused && !PLAYER.paused) {
            PLAYER.seekTo(data.currentTime);
            PLAYER.pause();
        } else if (PLAYER.paused && !data.paused) {
            PLAYER.play();
        }
        return PLAYER.getTime(function (seconds) {
            var accuracy, diff, time;
            time = data.currentTime;
            diff = (time - seconds) || time;
            accuracy = 2;

            if (diff > accuracy) {
                return PLAYER.seekTo(time);
            } else if (diff < -accuracy) {
                time += 1;
                return PLAYER.seekTo(time);
            }
        });
    };

    window.removeOld = function (replace) {
        var old;
        //$('#sc_volume').remove();
        if (replace == null) {
            replace = $('<div/>').addClass('embed-responsive-item');
        }
        old = $('#myVideoPlayer');
        replace.insertBefore(old);
        old.remove();
        replace.attr('id', 'myVideoPlayer');
        return replace;
    };

}).call(this);
