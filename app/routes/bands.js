import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.findAll('band');
  },

  afterModel: function() {
    Ember.$(document).attr('title', 'Bands - Rock & Roll');
  },

  actions: {
    createBand: function() {
      var route = this,
          controller = this.get('controller');

      var band = this.store.createRecord('band', {
        name: controller.get('newName')
      });
      band.save().then(function() {
        controller.set('newName', '');
        route.transitionTo('bands.band.songs', band);
      })
      ['catch'](function(error) {
        console.error(error);
      });
    }
  }
});

