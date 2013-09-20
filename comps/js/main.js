(function($) {
  $('.rating-star').on('mouseover', function() {
    console.log('Rate: ', $(this).attr('data-rating'));
  });
})(jQuery)
