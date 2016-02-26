import Ember from 'ember';

export default Ember.Controller.extend({
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

  sortedSongs: Ember.computed.sort('model.songs', 'sortProperties'),

  newSongPlaceholder: function() {
    return 'New ' + this.get('model.name') + ' song';
  }.property('model.name'),

  songCreationStarted: false,
  canCreateSong: function() {
    return this.get('songCreationStarted') || this.get('model.songs.length');
  }.property('songCreationStarted', 'model.songs.length'),

  actions: {
    enableSongCreation: function() {
      this.set('songCreationStarted', true);
    }
  }

});

