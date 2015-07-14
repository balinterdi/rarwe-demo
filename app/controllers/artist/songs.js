import Ember from 'ember';

export default Ember.Controller.extend({
  artist: null,
  sortOptions: [
    { id: "rating:desc,title:asc", name: "Best" },
    { id: "title:asc", name: "By title (asc)" },
    { id: "title:desc", name: "By title (desc)" },
    { id: "rating:asc", name: "By rating (asc)" },
    { id: "rating:desc", name: "By rating (desc)" },
  ],
  selectedSort: 'rating:desc,title:asc',

  sortProperties: function() {
    var selected = this.get('selectedSort');
    return (selected ? selected.split(',') : ['rating:desc', 'title:asc']);
  }.property('selectedSort'),

  sortedSongs: Ember.computed.sort('model', 'sortProperties'),

  newSongPlaceholder: function() {
    return 'New ' + this.get('artist.name') + ' song';
  }.property('artist.name'),

  songCreationStarted: false,
  canCreateSong: function() {
    return this.get('songCreationStarted') || this.get('model.length');
  }.property('songCreationStarted', 'model.length'),

  artistDidChange: function() {
    this.set('newTitle', '');
    this.set('songCreationStarted', false);
  }.observes('artist'),

  actions: {
    enableSongCreation: function() {
      this.set('songCreationStarted', true);
    }
  }

});

