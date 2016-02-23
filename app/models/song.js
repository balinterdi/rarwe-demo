import DS from 'ember-data';

export default DS.Model.extend({
  title:  DS.attr('string'),
  rating: DS.attr('number'),
  band: DS.belongsTo('band')
});

