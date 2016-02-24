export default [
  // { id: 1, name: 'Pearl Jam', songIds: [1, 2, 3, 4, 5] },
  // { id: 2, name: 'Led Zeppelin', songIds: [6, 7, 8] },
  // { id: 3, name: 'Foo Fighters', songIds: [9] },
  // { id: 4, name: 'Radiohead', songIds: [] }
  { id: 1, name: 'Pearl Jam', links: { songs: '/api/bands/1/songs' } },
  { id: 2, name: 'Led Zeppelin', links: { songs: '/api/bands/2/songs' } },
  { id: 3, name: 'Foo Fighters', links: { songs: '/api/bands/3/songs' } },
  { id: 4, name: 'Radiohead', links: { songs: '/api/bands/4/songs' } }
];
