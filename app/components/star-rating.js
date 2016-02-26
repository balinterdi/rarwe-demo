import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['rating-panel'],

  numStars:  Ember.computed.alias('maxRating'),
  fullStars: Ember.computed.alias('rating'),

  stars: Ember.computed('fullStars', 'numStars', function() {
    let fullStars = this.starRange(1, this.get('fullStars'), 'full');
    let emptyStars = this.starRange(this.get('fullStars') + 1, this.get('numStars'), 'empty');
    return fullStars.concat(emptyStars);
  }),

  starRange(start, end, type) {
    let starsData = [];
    for (let i = start; i <= end; i++) {
      starsData.push({ rating: i, full: type === 'full' });
    }
    return starsData;
  },

  actions: {
    setRating(newRating) {
      this.sendAction('setAction', {
        item: this.get('item'),
        rating: newRating
      });
    }
  }
});

