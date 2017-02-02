import Ember from 'ember';

export default Ember.Controller.extend({
  newName: '',
  disabled: Ember.computed.empty('newName')
});

