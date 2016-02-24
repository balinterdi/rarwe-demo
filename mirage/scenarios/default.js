export default function(server) {
  let pj = server.create('band', { name: 'Pearl Jam' });
  let daughter = server.create('song', {
    title: 'Daughter',
    rating: 5,
    bandId: pj.id
  });

  //NOTE: This should not be needed
  server.schema.song.all('song');
}
