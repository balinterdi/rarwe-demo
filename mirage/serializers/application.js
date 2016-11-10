import { JSONAPISerializer } from 'ember-cli-mirage';

export default JSONAPISerializer.extend({
  links(author) {
    return {
      'posts': {
        related: `/api/authors/${author.id}/posts`
      }
    };
  }
});
