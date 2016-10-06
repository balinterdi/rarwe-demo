import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from 'rarwe-demo/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | Bands', {
  beforeEach() {
    server.create('band', { name: 'Tool' });
    server.create('band', { name: 'Pearl Jam' });
  }
});

test('List bands', function(assert) {
  visit('/bands');

  andThen(function() {
    assert.equal(Ember.$('.band-link').length, 2, "All bands have a corresponding link");
    assert.ok(Ember.$('.band-link:contains("Tool")'), "Tool is displayed");
    assert.ok(Ember.$('.band-link:contains("Pearl Jam")'), "Pearl Jam is displayed");
  });
});
