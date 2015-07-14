import Ember from 'ember';

var StarRatingComponent = Ember.Component.extend({
  classNames: ['rating-panel'],

  numStars:  Ember.computed.alias('maxRating'),
  fullStars: Ember.computed.alias('rating'),

  stars: function() {
    var fullStars = this.starRange(1, this.get('fullStars'), 'full');
    var emptyStars = this.starRange(this.get('fullStars') + 1, this.get('numStars'), 'empty');
    return fullStars.concat(emptyStars);
  }.property('fullStars', 'numStars'),

  starRange: function(start, end, type) {
    var starsData = [];
    for (var i = start; i <= end; i++) {
      starsData.push({ rating: i, full: type === 'full' });
    }
    return starsData;
  },

  actions: {
    setRating: function(newRating) {
      this.sendAction('setAction', {
        item: this.get('item'),
        rating: newRating
      });
    }
  }
});

export default StarRatingComponent;
