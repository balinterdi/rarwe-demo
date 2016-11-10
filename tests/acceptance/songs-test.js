import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from 'rarwe-demo/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | Songs', {
  beforeEach() {
    let tool = server.create('band', {
      id: 1,
      name: 'Tool',
    });
    server.create('band', {
      id: 2,
      name: 'Pearl Jam',
    });

    server.create('song', { title: '46 & 2', bandId: tool.id });
    server.create('song', { title: 'Lateralus', bandId: tool.id });
    server.create('song', { title: 'Parabola', bandId: tool.id });
  }
});

test('List songs for a band', function(assert) {
  server.logging = true;
  visit('/bands');
  click('a:contains("Tool")');
  percySnapshot('list-songs-for-band');

  andThen(function() {
    assert.equal(Ember.$('.song').length, 3, "All songs for the selected band are displayed");
    assert.equal(Ember.$('.song:contains("46 & 2")').length, 1, "The first song is displayed");
  });
});
