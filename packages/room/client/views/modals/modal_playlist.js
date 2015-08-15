Template.modal_playlist.rendered = function(){
    $(document).ready(function(){
        var self = Template.instance();
    })
}

Template.modal_playlist_tabs_search.onCreated(function(){
    var self = this;
    self.resultItems = new ReactiveVar([]);
    self.isSearch = new ReactiveVar(false);
})

Template.modal_playlist_tabs_search.helpers({
    items : function () {
        return Template.instance().resultItems.get();
    },
    isSearching : function(){
        return (Template.instance().isSearch.get() === false) ? '' : 'loading';
    }
})

Template.modal_playlist_tabs_search.rendered = function(){
    var self = Template.instance();
    $(document).ready(function(){
        $('#modal_playlist_tabs_search .search-url').on('keyup',function(e){
            e.preventDefault();
            if(e.keyCode === 13){
                if(this.value || !_.isEmpty(this.value)){
                    self.isSearch.set(true);
                    Meteor.call('Xvideos_byUrl',this.value, function(err, result){
                        if(result){
                            self.isSearch.set(false);
                            var items = self.resultItems.get(),
                                isExists = _.contains(items, result.videoId);
                            if(!isExists){
                                items.unshift(result);
                                self.resultItems.set(items);
                            }
                        }
                    })
                }
            }
        })
    })
}
