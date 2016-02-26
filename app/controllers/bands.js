import Ember from 'ember';

export default Ember.Controller.extend({
  newName: '',
  disabled: Ember.computed('newName', function() {
    return Ember.isEmpty(this.get('newName'));
  })
});

