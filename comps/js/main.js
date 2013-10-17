(function($) {
  $('.rating-star').on('mouseover', function() {
    console.log('Rate: ', $(this).attr('data-rating'));
  });
  $('#create-song-link').on('click', function() {
    $('.empty-list').hide();
    $('#new-song-panel').show();
  });
})(jQuery)
