import Ember from 'ember';

var IndexRoute = Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('artists');
  }
});

export default IndexRoute;
