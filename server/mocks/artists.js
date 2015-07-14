var artists = [
  { id: 1, name: 'Pearl Jam', songs: [1, 2, 3, 4, 5] },
  { id: 2, name: 'Led Zeppelin', songs: [6, 7, 8] },
  { id: 3, name: 'Foo Fighters', songs: [9] },
  { id: 4, name: 'Radiohead', songs: [] }
];

var songs = [
  { id: 1, title: 'Daughter', rating: 5 },
  { id: 2, title: 'Yellow Ledbetter', rating: 5 },
  { id: 3, title: 'Animal', rating: 4 },
  { id: 4, title: 'Inside Job', rating: 4 },
  { id: 5, title: 'Who We Are', rating: 2 },
  { id: 6, title: 'Black Dog', rating: 4 },
  { id: 7, title: 'Achilles Last Stand', rating: 5 },
  { id: 8, title: 'Immigrant Song', rating: 4 },
  { id: 9, title: 'Pretender', rating: 3 }
];

var nextArtistId = artists.length + 1;

function findArtist(id) {
  var foundArtist;
  artists.forEach(function(artist) {
    if (artist.id === id) {
      foundArtist = artist;
      return;
    }
  });

  return foundArtist;
}

module.exports = function(app) {
  var express = require('express');
  var artistsRouter = express.Router();
  var bodyParser = require('body-parser');

  app.use(bodyParser.json());

  artistsRouter.get('/', function(req, res) {
    res.send({
      artists: artists,
      songs: songs
    });
  });

  artistsRouter.post('/', function(req, res) {
    var artist = req.body.artist;
    artist.id = nextArtistId;
    res.status(201).send({
      artist: artist
    }).end();
    nextArtistId += 1;
  });

  artistsRouter.get('/:id', function(req, res) {
    var id = req.params.id;
    var artist = findArtist(id);
    res.send({
      'artist': (artist || {})
    });
  });

  artistsRouter.put('/:id', function(req, res) {
    res.send({
      'artists': {
        id: req.params.id
      }
    });
  });

  artistsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/artists', artistsRouter);
};
