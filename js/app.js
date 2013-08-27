App = Ember.Application.create();

App.Song = Ember.Object.extend({
  title: null,
  rating: null,
  artist: null
});

App.Songs = Ember.A();

App.Songs.pushObject(App.Song.create({ title: 'Black Dog', artist: 'Led Zeppelin', rating: 8 }));
App.Songs.pushObject(App.Song.create({ title: 'Yellow Ledbetter', artist: 'Pearl Jam', rating: 10 }));
App.Songs.pushObject(App.Song.create({ title: 'The Pretender', artist: 'Foo Fighters', rating: 6 }));

App.alwaysWaiting = App.Song.create({ title: 'Always Waiting', artist: 'Kaya Project', rating: 9 });
