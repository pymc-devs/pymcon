// Use $ instead of jQuery without replacing global $
(function ($) {
    $.fn.highlighttext = function(){
        return this.each(function () {
            if($(this).find("span").length > 0){
                var spanleft = $(this).find("span").offset().left,
                    $thisleft = $(this).offset().left;
                if(spanleft === $thisleft){
                    $(this).addClass("highlight-text");
                }
            }
        });
    };
    
    $.fn.imageResponsiveIe= function(){
            return this.each(function () {
                var imgUrl = $(this).find("img").prop("src");
                if (imgUrl) {
                    $(this).find("img").attr("style", "display: none !important");
                    $(this).css("backgroundImage", 'url(' + imgUrl + ')').css({'background-repeat':'no-repeat','background-position':'center','background-size':'cover'});
                }
            });
    }

    // Fix image squishing on IE
    $.fn.imageResponsive = function () {
        return this.each(function () {
            var img = $(this).find("img"),
                defaultWidth = img.prop('naturalWidth'),
                defaultHeight = img.prop('naturalHeight'),
                parentHeight = $(this).outerHeight(true),
                parentWidth = $(this).width(),
                aspectRatio = defaultWidth / defaultHeight;
            img.css({
                "height": "auto",
                "width": "100%",
                "margin-left": "0px",
                "max-width": "inherit"
            });
            var imgHeight = parentWidth / aspectRatio;
            var imgTop = (imgHeight - parentHeight) / 2;
            img.css({
                "margin-top": "-" + imgTop + "px"
            });
            if (img.height() < parentHeight) {
                img.css({
                    "height": "100%",
                    "width": "auto"
                });
                var right_margin = (img.width() - parentWidth) / 2;
                img.css({
                    "margin-left": "-" + right_margin + "px",
                    "margin-top": "0"
                });
            }
            else if (img.width() < parentWidth) {
                img.css({
                    "height": "auto",
                    "width": "100%",
                    "margin-left": "0"
                });
                img.css({
                    "margin-top": "-" + imgTop + "px"
                });
            }
        });
    };
  // On DOM ready
  $(function () {
    
    $('#agenda .col-grid .three-col .col-three').matchHeight();

    // Initialize WOW.js plugin
//    new WOW().init();

    // Add class for IE and Edge on body
    if ($('html').hasClass('ua-ie')) {
      $('body').addClass('ua-ie');
    }
    
    if ($('html').hasClass('ua-edge')) {
      $('body').addClass('ua-edge');
    }

    
    $(".banner-hero .slider").each(function () {
      if($(this).find("h1").length > 0){
          var spanleft = $(this).find("h1").offset().left,
              $thisleft = $(this).find("h1 span").offset().left;
          if(spanleft === $thisleft){
              $(this).addClass("highlight-text");
          }
      }
    });
      $("h1").highlighttext();
      $("h2").highlighttext();
      $("h3").highlighttext();
      $("h4").highlighttext();
      $("h5").highlighttext();
      $("h6").highlighttext();


    // Detect small height devices and add class on body
    function detectHeight() {
      var windowHeight = $(window).height();
      (windowHeight <= 750) ? $('body.h2o').addClass('we-small-height') : $('body.h2o').removeClass('we-small-height');
    }

    detectHeight();
    $(window).on("resize", function () {
      detectHeight();
    }).resize();
  });

  // Add class to body for custom animation starting point
    $(window).on('load', function () {
        $('body').addClass('animate-in');
  });
})(jQuery);

(function ($) {
    // Use $ instead of jQuery without replacing global $
    // On DOM ready
    $(function () {

        // New York Event Landing form

        $(document).on('click', 'a[href^="#explainainyc-form"]', function (e) {
            e.preventDefault();
            $('#explainainyc-form').show();
            setTimeout(function () {
                $('#explainainyc-form').css({"opacity": "1"});
            }, 100);
        });
        $('#explainainyc-form .form-box .close-overlay').on("click", function () {
            $('#explainainyc-form').css({"opacity": "0"});
            setTimeout(function () {
                $('#explainainyc-form').hide();
            }, 400);
        });

    });

    /* Trigger button on click on landing banner eg. https://www.h2o.ai/h2oworldnewyork/*/
    $(function () {
        $(document).on('click', '.featured-views-slider .hide-btn-click', function (e) {
            e.preventDefault();
            $(".banner-hide-btn #eventbrite-widget-modal-trigger-63931289207").click();
            return false;
        });
    });
})(jQuery);

// Use $ instead of $ without replacing global $
(function ($) {
    // Return video id from any youtube link
    function getVideoId(url) {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[2].length == 11) {
            return match[2];
        } else {
            return 'error';
        }
    }

    // Video overlay
    function videoOverlay() {
        $(document).on('click', '.video-play', function (e) {
            e.preventDefault();
            $('body').addClass('h2o-overlay-active');
            if($(this).attr('data-attr')=="livestream") {
                var $video_script = $(this).parents('.community-videos .col-three').find('.livestream_video_script').html();
                $('.video-overlay').find('.container-outer').find('iframe').remove();
                $('.video-overlay').find('.container-outer').prepend($video_script);
                calcVideoRatio();
            } else {
                var url = $(this).attr('data-src');
                $('.video-overlay').find('iframe').attr('src', url + '?autoplay=1');
            }
        });
        closeVideoOverlay();
    }

    // Close video overlay on outside/close-btn click
    function closeVideoOverlay() {
        // Close video overlay on close button & outside click
        $('.video-overlay').on('click', '.outer-box, #close-video', function () {
            $('.video-overlay').find('iframe').attr('src', '');
            $('body').removeClass('h2o-overlay-active');
        });

        // Prevent closing on video's click
        $('.video-overlay .container-outer iframe').on('click', function (e) {
            e.stopPropagation();
        });
    }

    // Width/Height ratio calc for iframe in video-overlay
    function calcVideoRatio() {
        var winWidth = $(window).width(),
            winHeight = $(window).height(),
            video_width = winWidth / 1.5,
            video_height = video_width / 1.77,
            video_top_margin = (winHeight - video_height) / 2 + (30);
        $('.video-overlay iframe').attr('width', video_width + 'px');
        $('.video-overlay iframe').attr('height', video_height + 'px');
        $('.video-overlay .outer-box').css({'padding-top': video_top_margin + 'px', 'margin': '0px'});
    }

    // On DOM ready
    $(function () {

        $('a.livestream_video').each(function (i, ele) {
            var $this = $(ele),
                $video_script = $this.find('.livestream_video_script');
            if ($video_script) {
                $this.addClass('video-play');
            }
        });

        // Detect links that go to vimeo and convert to video links
        $('a[href*="youtube.com"]:not(.video-play), a[href*="youtu.be"]:not(.video-play)').each(function (i, ele) {
            var $this = $(ele),
                url = $this.attr('href'),
                id = getVideoId(url);
            if (id) {
                $this.addClass('video-play').attr('data-src', 'https://www.youtube.com/embed/' + id);
            }
        });

        // Initialize video overlay & calculate video ratio
        videoOverlay();
        calcVideoRatio();
    });

    // Calculate video overlay ratio on resize
    $(window).on('resize', function () {
        calcVideoRatio();
    }).resize();

    // On Orientation change
    $(window).on('orientationchange', function () {
        setTimeout(function () {
            calcVideoRatio();
        },50);
    });
})(jQuery);
