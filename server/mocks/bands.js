var bands = [
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

var nextBandId = bands.length + 1;

function findBand(id) {
  var foundBand;
  bands.forEach(function(band) {
    if (band.id === id) {
      foundBand = band;
      return;
    }
  });

  return foundBand;
}

module.exports = function(app) {
  var express = require('express');
  var bandsRouter = express.Router();
  var bodyParser = require('body-parser');

  app.use(bodyParser.json());

  bandsRouter.get('/', function(req, res) {
    res.send({
      bands: bands,
      songs: songs
    });
  });

  bandsRouter.post('/', function(req, res) {
    var band = req.body.band;
    band.id = nextBandId;
    res.status(201).send({
      band: band
    }).end();
    nextBandId += 1;
  });

  bandsRouter.get('/:id', function(req, res) {
    var id = req.params.id;
    var band = findBand(id);
    res.send({
      band: (band || {})
    });
  });

  bandsRouter.put('/:id', function(req, res) {
    res.send({
      'bands': {
        id: req.params.id
      }
    });
  });

  bandsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/bands', bandsRouter);
};
