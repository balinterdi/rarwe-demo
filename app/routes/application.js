import Ember from 'ember';

export default Ember.Route.extend({
  title(tokens) {
    return tokens.join(' - ') + ' - Rock and Roll';
  }
});
