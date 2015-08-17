// Write your package code here!
if(Meteor.isServer){
    Meteor.methods('getDurationOfFlv',function(url){
        var flvmeta = Npm.require('flvmeta'),
            request = Npm.require('request'),
            fs = Meteor.require('fs');
        HTTP.get(url,{
            headers : {
                'range' : 'bytes=0-10000'
            }
        },function(res){
            res.pipe(fs.createWriteStream('/tmp/1.flv'));
        })
    })
}
