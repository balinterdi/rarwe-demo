import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  links(band) {
    return {
      songs: {
        related: `/bands/${band.id}/songs`
      }
    };
  }
});
