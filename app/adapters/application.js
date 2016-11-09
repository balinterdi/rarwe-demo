import DS from 'ember-data';
// import ENV from 'rarwe/config/environment';

export default DS.JSONAPIAdapter.extend({
  host: 'http://json-api.rockandrollwithemberjs.com'
});

// API lived at http://rock-and-roll-with-emberjs-api.herokuapp.com

