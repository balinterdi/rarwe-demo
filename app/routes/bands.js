import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('band');
  },

  titleToken: 'Bands',

  actions: {
    createBand() {
      let route = this,
          controller = this.get('controller');

      let band = this.store.createRecord('band', {
        name: controller.get('newName')
      });
      return band.save().then(function() {
        controller.set('newName', '');
        route.transitionTo('bands.band.songs', band);
      });
    }
  }
});

