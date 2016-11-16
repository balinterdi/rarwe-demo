import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('band', params.id);
  },

  titleToken: function(model) {
    return model.get('name');
  }

});

