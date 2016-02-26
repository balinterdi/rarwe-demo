import ActiveModelAdapter from 'active-model-adapter';

export default ActiveModelAdapter.extend({
  namespace: 'api',
  shouldBackgroundReloadRecord() {
    return false;
  },
});

// API lived at http://rock-and-roll-with-emberjs-api.herokuapp.com

