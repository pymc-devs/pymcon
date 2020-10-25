(function ($) {
  // On DOM ready
  $(function () {
    videoOverlay();
    videoOverlay1();

    $('.col-four-team-grid .col-four').matchHeight();
    $('.col-four-team-grid .col-four .content').matchHeight();
      $('.speakers-slider .content-wrapper .col-three').matchHeight();
    $('.events-schedule .four-col.yellow .col-four').matchHeight();
    $('.events-schedule .four-col .col-four p').matchHeight();
      $('.we-financial-col-three .col-three-outer h4').matchHeight();
    $( '.events-schedule.explain-event .col-grid .column').matchHeight();



  });


  /*
   * Video overlay
   */
  function videoOverlay() {
    $(document).on('click', '.col-four-team-grid .col-four', function (e) {
      e.preventDefault();
      e.stopPropagation();
      $('.col-four-team-grid .col-four').removeClass('active');
      $(this).addClass('active');
      $(".col-four-team-grid .col-four.active .col-four-team-info-div").clone().appendTo(".we-video-overlay .content");
      $('body').addClass('overlay-active');
      $(".we-video-overlay .video-overlay").addClass("we-active");
    });
    closeVideoOverlay();
  }

  function closeVideoOverlay() {
    $('.close').on('click', function () {
      $('body').removeClass('overlay-active');
      $('.col-four-team-grid .col-four').removeClass('active');
      $('.we-video-overlay .video-overlay').removeClass("we-active");
      $(".we-video-overlay .content .col-four-team-info-div").remove();
    });

    // Close video overlay on outside click
    $('.we-video-overlay .v-middle-inner').on('click', function () {
      $('body').removeClass('overlay-active');
      $('.col-four-team-grid .col-four').removeClass('active');
      $(".we-video-overlay .content .col-four-team-info-div").remove();
      $('.we-video-overlay .video-overlay').removeClass("we-active");
    });
  }




  function videoOverlay1() {
    $(document).on('click', '.speakers-slider .content-wrapper .col-three', function (e) {
      e.preventDefault();
      e.stopPropagation();
      $('.speakers-slider .content-wrapper .col-three').removeClass('active');
      $(this).addClass('active');
      $(".speakers-slider .content-wrapper .col-three.active .col-four-team-info-div").clone().appendTo(".we-video-overlay .content");
      $('body').addClass('overlay-active');
      $(".we-video-overlay .video-overlay").addClass("we-active");
    });
    closeVideoOverlay1();
  }

  function closeVideoOverlay1() {
    $('.close').on('click', function () {
      $('body').removeClass('overlay-active');
      $('.speakers-slider .content-wrapper .col-three').removeClass('active');
      $('.we-video-overlay .video-overlay').removeClass("we-active");
      $(".we-video-overlay .content .col-four-team-info-div").remove();
    });

    // Close video overlay on outside click
    $('.we-video-overlay .v-middle-inner').on('click', function () {
      $('body').removeClass('overlay-active');
      $('.speakers-slider .content-wrapper .col-three').removeClass('active');
      $(".we-video-overlay .content .col-four-team-info-div").remove();
      $('.we-video-overlay .video-overlay').removeClass("we-active");
    });
  }
})(jQuery);