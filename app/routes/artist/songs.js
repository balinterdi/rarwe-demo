import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.modelFor('artist').get('songs');
  },

  afterModel: function() {
    var artistName = this.modelFor('artist').get('name');
    Ember.$(document).attr('title', artistName + ' songs - Rock & Roll');
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('artist', this.modelFor('artist'));
  },

  actions: {
    createSong: function() {
      var controller = this.get('controller'),
          artist = this.modelFor('artist');

      var song = this.store.createRecord('song', {
        title: controller.get('newTitle'),
        artist: artist
      });
      song.save().then(function() {
        controller.set('newTitle', '');
      })
      ['catch'](function(error) {
        console.error(error);
      });
    },

    setRating: function(params) {
      var song = params.item,
          rating = params.rating;

      if (song.get('rating') === rating) {
        rating = null;
      }
      song.set('rating', rating);
      return song.save();
    }
  }
});

