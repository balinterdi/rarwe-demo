export default function(server) {
  let pearlJam = server.create('band', { name: 'Pearl Jam' });
  let ledZeppelin = server.create('band', { name: 'Led Zeppelin' });
  let fooFighters = server.create('band', { name: 'Foo Fighters' });
  server.create('band', { name: 'Radiohead' });

  server.create('song', { title: 'Daughter', rating: 5, band: pearlJam });
  server.create('song', { title: 'Yellow Ledbetter', rating: 5, band: pearlJam });
  server.create('song', { title: 'Animal', rating: 4, band: pearlJam });
  server.create('song', { title: 'Inside Job', rating: 4, band: pearlJam });
  server.create('song', { title: 'Who We Are', rating: 2, band: pearlJam });

  server.create('song', { title: 'Black Dog', rating: 4, band: ledZeppelin });
  server.create('song', { title: 'Achilles Last Stand', rating: 5, band: ledZeppelin });
  server.create('song', { title: 'Immigrant Song', rating: 4, band: ledZeppelin });

  server.create('song', { title: 'Pretender', rating: 3, band: fooFighters });
}