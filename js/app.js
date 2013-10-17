App = Ember.Application.create();

App.Artist = Ember.Object.extend({
  name: null,

  slug: function() {
    return this.get('name').dasherize();
  }.property('name'),

  // songs: function() {
  //   return App.Songs.filterProperty('artist', this.get('name'));
  // }.property('name', 'App.Songs.@each.artist')
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
      Ember.$.getJSON('http://localhost:9393/artists.json').then(function(artists) {
        var artistObjects = [];
        artists.forEach(function(artist) {
          var record = App.Artist.create({ name: artist.name });
          artistObjects.push(record);
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

      var artistPromise = Ember.$.ajax('http://localhost:9393/artists.json', {
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
    return App.Artists.findProperty('slug', params.slug);
  },
  actions: {
    createSong: function() {
      var artist = this.controller.get('model.name');
      var title = this.controller.get('newTitle');
      var song = App.Song.create({ title: title, artist: artist });
      App.Songs.pushObject(song);
      this.controller.set('newTitle', '');
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

