import Ember from 'ember';

export default Ember.Route.extend({
  afterModel: function() {
    var bandName = this.modelFor('bands.band').get('name');
    Ember.$(document).attr('title', bandName + ' songs - Rock & Roll');
  },

  resetController: function(controller) {
    controller.setProperties({
      newTitle: '',
      songCreationStarted: false
    });
  },

  actions: {
    createSong: function() {
      var controller = this.get('controller'),
          band = controller.get('model');

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

