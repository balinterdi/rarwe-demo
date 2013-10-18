App = Ember.Application.create();

App.Artist = Ember.Object.extend({
  id: null,
  name: null,
  songs: [],

  slug: function() {
    return this.get('name').dasherize();
  }.property('name'),

  extractSongs: function(songsData) {
    var artist = this;
    var songObjects = songsData.map(function(song) {
      return App.Song.create({ title: song.title, rating: song.rating, artist: artist });
    });
    this.set('songs', songObjects);
  }
});

App.Song = Ember.Object.extend({
  title: null,
  rating: null,
  artist: null
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
    return Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.getJSON('http://localhost:9393/artists').then(function(artists) {
        var artistObjects = [];
        artists.forEach(function(artist) {
          var artistObject = App.Artist.create({ id: artist.id, name: artist.name });
          artistObject.extractSongs(artist.songs);
          artistObjects.push(artistObject);
        });
        resolve(artistObjects);
      });
    });
  },
  actions: {
    createArtist: function() {
      var route = this;
      var name = this.get('controller').get('newName');
      var artist = App.Artist.create({ name: name });

      var artistPromise = Ember.$.ajax('http://localhost:9393/artists', {
        type: 'POST',
        headers: { 'Accept': 'application/json' },
        data: { name: name }
      });
      artistPromise.then(function() {
        route.modelFor('artists').pushObject(artist);
        route.get('controller').set('newName', '');
        route.transitionTo('artists.songs', artist);
      }, function() {
        alert('Failed to save artist');
      });
    }
  }
});

App.ArtistsSongsRoute = Ember.Route.extend({
  model: function(params) {
    return Ember.RSVP.Promise(function(resolve, reject) {
      artistPromise = Ember.$.getJSON('http://localhost:9393/artists/' + params.slug);
      artistPromise.then(function(artist) {
        var artistObject = App.Artist.create({ name: artist.name });
        artistObject.extractSongs(artist.songs);
        resolve(artistObject);
      });
    });
  },

  actions: {
    createSong: function() {
      var route = this;
      var artist = this.controller.get('model');
      var title = this.controller.get('newTitle');
      var song = App.Song.create({ title: title, artist: artist });
      var songPromise = Ember.$.ajax('http://localhost:9393/songs', {
        type: 'POST',
        headers: { 'Accept': 'application/json' },
        data: { title: title, artist_id: artist.get('id') }
      });
      songPromise.then(function() {
        route.modelFor('artists.songs').get('songs').pushObject(song);
        route.get('controller').set('newTitle', '');
      }, function() {
        alert('Failed to save song');
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

