import Ember from 'ember';

export default Ember.Route.extend({
  fastboot: Ember.inject.service(),

  afterModel() {
    if (this.get('fastboot.isFastBoot')) {
      let band = this.modelFor('bands.band');
      return band.get('songs');
    }
  },

  resetController(controller) {
    controller.setProperties({
      newTitle: '',
      songCreationStarted: false
    });
  },

  title() {
    let bandName = this.modelFor('bands.band').get('name');
    return `${bandName} songs - Rock and Roll`;
  },

  actions: {
    createSong() {
      let controller = this.get('controller'),
          band = controller.get('model');

      let song = this.store.createRecord('song', {
        title: controller.get('newTitle'),
        band: band
      });
      song.save().then(function() {
        controller.set('newTitle', '');
      }).catch(function(error) {
        console.error(error);
      });
    },

    setRating(params) {
      let { item: song, rating } = params;

      if (song.get('rating') === rating) {
        rating = null;
      }
      song.set('rating', rating);
      return song.save();
    }
  }
});

