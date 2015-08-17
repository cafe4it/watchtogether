Template.modal_playlist.rendered = function () {
    $(document).ready(function () {
        var self = Template.instance();
    })
}

Template.modal_playlist_tabs_search.onCreated(function () {
    var self = this;
    self.resultItems = new ReactiveVar([]);
    self.isSearch = new ReactiveVar(false);
})

Template.modal_playlist_tabs_search.helpers({
    items: function () {
        return Template.instance().resultItems.get();
    },
    isSearching: function () {
        return (Template.instance().isSearch.get() === false) ? '' : 'loading';
    }
})

Template.modal_playlist_tabs_search.rendered = function () {
    var self = Template.instance();
    $(document).ready(function () {
        $('#modal_playlist_tabs_search .search-url').on('keyup', function (e) {
            e.preventDefault();
            if (e.keyCode === 13) {
                if (this.value || !_.isEmpty(this.value)) {
                    var txt = this;
                    self.isSearch.set(true);
                    Meteor.call('searchAndAddVideoToStore', this.value, function (err, result) {
                        if (result) {
                            self.isSearch.set(false);
                            var items = self.resultItems.get(),
                                isExists = _.contains(_.pluck(items, '_id'), result._id);
                            if (!isExists) {
                                items.unshift(_.extend(result, {roomId : self.data.roomId}));
                                txt.value = '';
                                self.resultItems.set(items);
                            }
                        }
                    })
                }
            }
        });
    })
}

Template.modal_playlist_tabs_search.events({
    //add to playlist
    'click #modal_playlist_tabs_search .positive.button' : function(e,t){
        e.preventDefault();
        var item = getItemByIdFromResultItems(e,t);
        if(item){

        }
    },
    //play now
    'click #modal_playlist_tabs_search .negative.button' : function(e,t){
        e.preventDefault();
        var item = getItemByIdFromResultItems(e,t);
        if(item){
            Meteor.call('playVideoNow', t.data.roomId, item._id,function(err,rs){
                if(err) console.log(err);
                if(rs === 'SUCCESS'){
                    sAlert.success(item.title +' play now!');
                    $('#modal_playlist_tabs_search .removeit.button').trigger('click');
                }
            })
        }
    },
    //remove from result search items
    'click #modal_playlist_tabs_search .removeit.button' : function(e,t){
        e.preventDefault();
        var item = getItemByIdFromResultItems(e,t);
        if(item){
            var items = _.reject(t.resultItems.get(),function(i){ return i._id == item._id});
            t.resultItems.set(items);
        }
    }
})

function getItemByIdFromResultItems(e,t){
    var self = t;
    if(e.currentTarget){
        var videoId = e.currentTarget.getAttribute('data-id');
        if(videoId){
            var resultItems = self.resultItems.get();
            var video = _.findWhere(resultItems,{_id : videoId});
            return (video) ? video : undefined;
        }
    }
}