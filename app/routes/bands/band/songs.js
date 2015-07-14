import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.modelFor('bands.band').get('songs');
  },

  afterModel: function() {
    var bandName = this.modelFor('bands.band').get('name');
    Ember.$(document).attr('title', bandName + ' songs - Rock & Roll');
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('band', this.modelFor('bands.band'));
  },

  actions: {
    createSong: function() {
      var controller = this.get('controller'),
          band = this.modelFor('bands.band');

      var song = this.store.createRecord('song', {
        title: controller.get('newTitle'),
        band: band
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

