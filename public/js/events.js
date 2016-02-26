$(function() {
  $('.book-promo .link').click(function(event) {
    ga('send', {
      'hitType': 'event',
      'eventCategory': 'link',
      'eventAction': 'visit',
      'eventLabel': 'rarwe-landing-page'
    });
  });
});
