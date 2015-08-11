// Write your package code here!
if(Meteor.isServer){
    Meteor.methods({
        'Xvideos_byUrl' : function(url){
            try{
                var rs = Async.runSync(function(done){
                    var x = new Xray();
                    x(url,{
                        flashvars : '#flash-player-embed@flashvars'
                    })(function(err, obj){
                        if(err) throw new Meteor.Error(err);
                        if(_.has(obj,'flashvars')){
                            var query = decodeURIComponent(obj.flashvars),
                                params = URI.parseQuery(query),
                                tpl = _.template('<%=flv_url%>&ri=<%=ri%>&rs=<%=rs%>&h=<%=h%>');
                            var result = {
                                videoId : params.id_video,
                                url : tpl({
                                    flv_url : params.flv_url,
                                    ri : params.ri,
                                    rs : params.rs,
                                    h : params.h
                                }),
                                thumbnail : params.url_bigthumb
                            }

                            done(null,result);
                        }
                    })
                })
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