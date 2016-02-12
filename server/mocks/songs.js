//TODO: This is duplicated in mocks/bands.js, extract to common module and require it
//
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

var nextSongId = songs.length + 1;

module.exports = function(app) {
  var express = require('express');
  var songsRouter = express.Router();
  var bodyParser = require('body-parser');

  app.use(bodyParser.json());

  songsRouter.get('/', function(req, res) {
    res.send({
      'songs': []
    });
  });

  songsRouter.post('/', function(req, res) {
    var song = req.body.song;
    song.id = nextSongId;
    res.status(201).send({
      song: song
    }).end();
    nextSongId += 1;
  });

  songsRouter.get('/:id', function(req, res) {
    res.send({
      'songs': {
        id: req.params.id
      }
    });
  });

  songsRouter.put('/:id', function(req, res) {
    var song = req.body.song;
    song.id = req.params.id;
    res.status(201).send({
      song: song
    }).end();
  });

  songsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/songs', songsRouter);
};
