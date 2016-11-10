import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  links(band) {
    return {
      songs: {
        related: `/api/bands/${band.id}/songs`
      }
    };
  }
});
