Template.modal_playlist.rendered = function(){
    $(document).ready(function(){
        var self = Template.instance();
        $('#abc').on('click',function(e){
            console.log(self.data.roomId);
        })
    })
}