App = Ember.Application.create();

App.Adapter = {
  ajax: function(path, options) {
    var options = options || {};
    options.dataType = 'json';
    return Ember.$.ajax('http://rock-and-roll-api.herokuapp.com' + path, options)
  }
}

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
      return App.Song.create({ id: song.id, title: song.title, rating: song.rating, artist: artist });
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
    return Ember.RSVP.Promise(function(resolve, reject) {
      var artistObjects = [];
      App.Adapter.ajax('/artists').then(function(artists) {
        artists.forEach(function(data) {
          artistObjects.pushObject(App.Artist.createRecord(data));
        });
        resolve(artistObjects);
      }, function(error) {
        reject(error);
      });
    });
  },
  actions: {
    createArtist: function() {
      var name = this.get('controller').get('newName');

      App.Adapter.ajax('/artists', {
        type: 'POST',
        data: { name: name },
        context: this
      }).then(function(data) {
          var artist = App.Artist.createRecord(data);
          this.modelFor('artists').pushObject(artist);
          this.get('controller').set('newName', '');
          this.transitionTo('artist.songs', artist);
      }, function(reason) {
        alert('Failed to save artist');
      });
    }
  }
});

App.ArtistsSongsRoute = Ember.Route.extend({
  model: function(params) {
    return Ember.RSVP.Promise(function(resolve, reject) {
      App.Adapter.ajax('/artists/' + params.slug).then(function(data) {
        resolve(App.Artist.createRecord(data));
      }, function(error) {
        reject(error);
      });
    });
  },

  actions: {
    createSong: function() {
      var artist = this.controller.get('model');
      var title = this.controller.get('newTitle');
      App.Adapter.ajax('/songs', {
        type: 'POST',
        context: this,
        data: { title: title, artist_id: artist.id }
      }).then(function(data) {
        var song = App.Song.createRecord(data);
        song.set('artist', artist);
        this.modelFor('artists.songs').get('songs').pushObject(song);
        this.get('controller').set('newTitle', '');
      }, function(reason) {
        alert('Failed to save song');
      });
    },

    setRating: function(song) {
      App.Adapter.ajax('/songs/' + song.get('id'), {
        type: 'PUT',
        context: this,
        data: { rating: song.get('rating') }
      }).then(function() {
        console.log("Rating updated");
      }, function() {
        alert('Failed to set new rating');
      });
    }
  }
});

App.StarRatingComponent = Ember.Component.extend({
  classNames: ['rating-panel'],

  numStars:  Ember.computed.alias('maxRating'),
  fullStars: null,

  didInsertElement: function() {
    var property = this.get('ratingProperty');
    this.set('fullStars', this.get('item').get(property));
    Ember.addObserver(this.get('item'), property, this, this.ratingPropertyDidChange);
  },

  willDestroyElement: function() {
    var property = this.get('ratingProperty');
    Ember.removeObserver(this.get('item'), property, this.ratingPropertyDidChange);
  },

  ratingPropertyDidChange: function(item, ratingProperty) {
    this.set('fullStars', item.get(ratingProperty));
  },

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
    for (var i = start; i <= end; i++) {
      starsData.push({ rating: i, full: type === 'full' });
    };
    return starsData;
  },

  actions: {
    setRating: function() {
      var newRating = parseInt($(event.target).attr('data-rating'), 10);
      this.get('item').set(this.get('ratingProperty'), newRating);
      this.sendAction('setAction', this.get('item'));
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

