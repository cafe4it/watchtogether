Template.room_home.rendered = function(){
    $(document).ready(function(){
        
    })
}

Template.room_home.helpers({
    room : function(){
        return {
            id : FlowRouter.getParam('id')
        }
    }
})