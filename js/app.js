App = Ember.Application.create();

Ember.RSVP.configure('onerror', function(error) {
  if (error instanceof Error) {
    Ember.Logger.assert(false, error);
    Ember.Logger.error(error.stack);
  }
});

App.Adapter = {
  ajax: function(path, options) {
    var options = options || {};
    options.dataType = 'json';
    return ic.ajax.request('http://rock-and-roll-with-emberjs-api.herokuapp.com' + path, options);
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
    return Ember.RSVP.resolve(artist);
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
    this.resource('artist', { path: ':slug' }, function() {
      this.route('songs');
    });
  });
});

App.IndexRoute = Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('artists');
  }
});

App.ArtistsRoute = Ember.Route.extend({
  model: function() {
    return App.Adapter.ajax('/artists').then(function(data) {
      artists = data.map(App.Artist.createRecord, App.Artist);
      return Ember.RSVP.all(artists);
    });
  },

  afterModel: function() {
    $(document).attr('title', 'Artists - Rock & Roll');
  },

  actions: {
    createArtist: function() {
      var name = this.get('controller').get('newName');
      var self = this;

      App.Adapter.ajax('/artists', {
        type: 'POST',
        data: { name: name },
        context: this
      }).then(function(data) {
        var artist = App.Artist.createRecord(data);
        self.modelFor('artists').pushObject(artist);
        self.get('controller').set('newName', '');
        self.transitionTo('artist.songs', artist);
      }, function(reason) {
        alert('Failed to save artist');
      });
    }
  }
});

App.ArtistRoute = Ember.Route.extend({
  model: function(params) {
    return App.Adapter.ajax('/artists/' + params.slug).then(function(data) {
      return App.Artist.createRecord(data);
    });
  }
});

App.ArtistSongsRoute = Ember.Route.extend({
  model: function(params) {
    return this.modelFor('artist').get('songs');
  },

  afterModel: function(model) {
    var artistName = this.modelFor('artist').get('name');
    $(document).attr('title', artistName + ' songs - Rock & Roll');
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('artist', this.modelFor('artist'));
  },

  actions: {
    createSong: function() {
      var artist = this.modelFor('artist');
      var title = this.controller.get('newTitle');
      var self = this;
      App.Adapter.ajax('/songs', {
        type: 'POST',
        context: this,
        data: { title: title, artist_id: artist.id }
      }).then(function(data) {
        var song = App.Song.createRecord(data);
        song.set('artist', artist);
        self.modelFor('artist.songs').pushObject(song);
        self.get('controller').set('newTitle', '');
      }, function(reason) {
        alert('Failed to save song');
      });
    },

    setRating: function(params) {
      var song = params.item,
          rating = params.rating;

      if (song.get('rating') === rating) {
        rating = 0;
      }
      song.set('rating', rating);
      App.Adapter.ajax('/songs/' + song.get('id'), {
        type: 'PUT',
        context: this,
        data: { rating: rating }
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
  fullStars: Ember.computed.alias('rating'),

  stars: function() {
    var fullStars = this.starRange(1, this.get('fullStars'), 'full');
    var emptyStars = this.starRange(this.get('fullStars') + 1, this.get('numStars'), 'empty');
    return fullStars.concat(emptyStars);
  }.property('fullStars', 'numStars'),

  starRange: function(start, end, type) {
    var starsData = [];
    for (var i = start; i <= end; i++) {
      starsData.push({ rating: i, full: type === 'full' });
    };
    return starsData;
  },

  actions: {
    setRating: function(newRating) {
      this.sendAction('setAction', {
        item: this.get('item'),
        rating: newRating
      });
    }
  }
});

App.ArtistsController = Ember.ArrayController.extend({
  newName: '',
  disabled: function() {
    return Ember.isEmpty(this.get('newName'));
  }.property('newName')
});

App.ArtistSongsController = Ember.ArrayController.extend({
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
    return this.get('songCreationStarted') || this.get('length');
  }.property('songCreationStarted', 'length'),

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

