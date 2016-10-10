export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  this.passthrough('/_percy/**');

  this.namespace = 'api';
  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');
  */
  this.get('/bands');
  this.post('/bands');
  this.get('/bands/:id');
  this.get('/bands/:id/songs', function(schema, request) {
    let bandId = request.params.id;
    return schema.songs.where({ bandId });
  });

  this.post('/songs');
  this.put('/songs/:id', function(schema, request) {
    let id = request.params.id;
    let attrs = JSON.parse(request.requestBody).song;

    delete attrs.band;

    return schema.songs.find(id).update(attrs);
  });
}
