import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.findAll('artist');
  },

  afterModel: function() {
    Ember.$(document).attr('title', 'Artists - Rock & Roll');
  },

  actions: {
    createArtist: function() {
      var route = this,
          controller = this.get('controller');

      var artist = this.store.createRecord('artist', {
        name: controller.get('newName')
      });
      artist.save().then(function() {
        controller.set('newName', '');
        route.transitionTo('artist.songs', artist);
      })
      ['catch'](function(error) {
        console.error(error);
      });
    }
  }
});

