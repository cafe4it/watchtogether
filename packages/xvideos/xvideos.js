// Write your package code here!
if(Meteor.isServer){
    Meteor.methods({
        'Xvideos_byUrl' : function(url){
            try{
                var rs = Async.runSync(function(done){
                    var x = new Xray();
                    x(url,{
                        title : '#main > h2@text',
                        duration : '#main > h2 .duration@text',
                        flashvars : '#flash-player-embed@flashvars'
                    })(function(err, obj){
                        if(err) throw new Meteor.Error(err);
                        if(_.has(obj,'flashvars')){
                            var query = decodeURIComponent(obj.flashvars),
                                params = URI.parseQuery(query),
                                tpl = _.template('<%=flv_url%>&ri=<%=ri%>&rs=<%=rs%>&h=<%=h%>'),
                                title = obj.title.replace(obj.duration,'').trim()
                            var result = {
                                videoId : params.id_video,
                                title : title,
                                src : tpl({
                                    flv_url : params.flv_url,
                                    ri : params.ri,
                                    rs : params.rs,
                                    h : params.h
                                }),
                                thumbnail : params.url_bigthumb,
                                type  : 'video/x-flv',
                                source : 'XVIDEOS',
                                urls : [url]
                            }
                            done(null,result);
                        }
                    })
                });
                var result = rs.result;
                if(result.src){
                    rs = Async.runSync(function(done){
                        ffProbe(result.src, function(err, probeData){
                            var duration = (probeData.format.duration) ? Math.floor(+probeData.format.duration) : -1;
                            (duration > 0 ) ? done(null, _.extend(result, {duration : duration})) : done(null, result);
                        })
                    });
                    return rs.result;
                }
                return rs.result;
            }catch(ex){
                console.error(ex);
            }
            return false;
        }
    });

    function getParameterByName(name, query) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(query);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
}