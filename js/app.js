App = Ember.Application.create();

App.Artist = Ember.Object.extend({
  id: '',
  name: '',
  songs: [],

  slug: function() {
    return this.get('name').dasherize();
  }.property('name'),
});

App.Artist.reopenClass({
  createRecord: function(data) {
    var artist = App.Artist.create({ id: data.id, name: data.name });
    artist.set('songs', this.extractSongs(data.songs, artist));
    return artist;
  },
  extractSongs: function(songsData, artist) {
    return songsData.map(function(song) {
      return App.Song.create({ title: song.title, rating: song.rating, artist: artist });
    });
  }
});

App.Song = Ember.Object.extend({
  id: null,
  title: null,
  rating: null,
  artist: null
});

App.Song.reopenClass({
  createRecord: function(data) {
    return App.Song.create({ id: data.id, title: data.title, rating: data.rating });
  }
});

App.Router.map(function() {
  this.resource('artists', function() {
    this.route('songs', { path: ':slug' });
  });
});

App.IndexRoute = Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('artists');
  }
});

App.ArtistsRoute = Ember.Route.extend({
  model: function() {
    var artistObjects = Ember.A();
    Ember.$.getJSON('http://localhost:9393/artists', function(artists) {
      artists.forEach(function(data) {
        artistObjects.pushObject(App.Artist.createRecord(data));
      });
    });
    return artistObjects;
  },
  actions: {
    createArtist: function() {
      var name = this.get('controller').get('newName');

      Ember.$.ajax('http://localhost:9393/artists', {
        type: 'POST',
        dataType: 'json',
        data: { name: name },
        context: this,
        success: function(data) {
          var artist = App.Artist.createRecord(data);
          this.modelFor('artists').pushObject(artist);
          this.get('controller').set('newName', '');
          this.transitionTo('artists.songs', artist);
        },
        error: function() {
          alert('Failed to save artist');
        }
      });
    }
  }
});

App.ArtistsSongsRoute = Ember.Route.extend({
  model: function(params) {
    var artist = App.Artist.create();
    var url = 'http://localhost:9393/artists/' + params.slug;
    Ember.$.getJSON(url, function(data) {
      artist.setProperties({
        id: data.id,
        name: data.name,
        songs: App.Artist.extractSongs(data.songs, artist)
      });
    });
    return artist;
  },

  actions: {
    createSong: function() {
      var artist = this.controller.get('model');
      var title = this.controller.get('newTitle');
      Ember.$.ajax('http://localhost:9393/songs', {
        type: 'POST',
        dataType: 'json',
        context: this,
        data: { title: title, artist_id: artist.id },
        success: function(data) {
          var song = App.Song.createRecord(data);
          song.set('artist', artist);
          this.modelFor('artists.songs').get('songs').pushObject(song);
          this.get('controller').set('newTitle', '');
        },
        error: function() {
          alert('Failed to save song');
        }
      });
    }
  }
});

App.StarRating = Ember.View.extend({
  classNames: ['rating-panel'],
  templateName: 'star-rating',
  rating: Ember.computed.alias('context.rating'),

  fullStars: Ember.computed.alias('rating'),
  numStars:  Ember.computed.alias('maxRating'),

  stars: function() {
    var ratings = [];
    var fullStars = this.starRange(1, this.get('fullStars'), 'full');
    var emptyStars = this.starRange(this.get('fullStars') + 1, this.get('numStars'), 'empty');
    Array.prototype.push.apply(ratings, fullStars);
    Array.prototype.push.apply(ratings, emptyStars);
    return ratings;
  }.property('fullStars', 'numStars'),

  starRange: function(start, end, type) {
    var starsData = [];
    for (i = start; i <= end; i++) {
      starsData.push({ rating: i, full: type === 'full' });
    };
    return starsData;
  },

  actions: {
    setRating: function() {
      var newRating = $(event.target).data('rating');
      this.set('rating', newRating);
    }
  }
});

App.ArtistsController = Ember.ArrayController.extend({
  newName: '',
  disabled: function() {
    return Ember.isEmpty(this.get('newName'));
  }.property('newName')
});

App.ArtistsSongsController = Ember.ObjectController.extend({

  newSongPlaceholder: function() {
    return 'New ' + this.get('name') + ' song';
  }.property('name'),

  songCreationStarted: false,
  canCreateSong: function() {
    return this.get('songCreationStarted') || this.get('songs.length');
  }.property('songCreationStarted', 'songs.length'),

  actions: {
    enableSongCreation: function() {
      this.set('songCreationStarted', true);
    }
  }

});

