import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  namespace: 'api'
});

// API lived at http://rock-and-roll-with-emberjs-api.herokuapp.com

