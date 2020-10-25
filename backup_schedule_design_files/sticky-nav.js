// Use $ instead of $ without replacing global $
(function ($) {
  // Define all variables
  var flag = true,
          targetScroll = 0,
          sectionposition = 0,
          scrollId = 0;

  // To limit the rate of function call
  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this, args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate)
          func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow)
        func.apply(context, args);
    };
  }


  function navResize() {
    /* Nav for responsive */
    if ($(".sticky-nav.fixed-nav").length > 0) {
      var navHeight = $(".sticky-nav .container").outerHeight(),
              logoLeft = $("body.h2o header .logo").offset().left;
      $(".sticky-nav.fixed-nav").css({"height": navHeight + "px"});
      $(".sticky-nav.fixed-nav .container").css({"padding-left": logoLeft + "px"});
    }
  }

  function scrollQuery($target) {
    var $navOffest = $("body.h2o header").outerHeight(),
            $tocContentOffset = $(".sticky-nav").outerHeight(),
            scrolled = $(document).scrollTop(),
            targetPosition = ($target.offset().top) - scrolled;
    if ($(".sticky-nav.fixed-nav").length > 0 && (targetPosition < 0)) {
      targetScroll = $tocContentOffset + $navOffest;
    } else {
      targetScroll = $tocContentOffset;
    }
  }

  function smoothScroll() {
    // Active nav on click
    $('.h2o .sticky-nav ul li a').on('click', function (a) {
      a.preventDefault();
      $(".h2o .sticky-nav ul li").removeClass("active");
      $(this).parent().addClass("active");
    });
    // Scroll to section on click
    $('.h2o .sticky-nav ul li a[href^="#"]').on('click', function (e) {
      e.preventDefault();
      flag = false;
      var $this = this,
              targetID = $this.hash,
              $target = $(targetID);
      scrollQuery($target);
      $('html, body').stop().animate({
        'scrollTop': ($target.offset().top - targetScroll)
      }, 800, 'swing');
      setTimeout(function () {
        flag = true;
      }, 900);
    });
  }

  function scollToSection() {
    $('.h2o .sticky-nav a.btn-yellow[href^="#"]').on('click', function (e) {
      e.preventDefault();
      flag = false;
      var $this = this,
              targetID = $this.hash,
              $target = $(targetID),
              sectionId = $target.parents('section').attr('id');

      $(".h2o .sticky-nav ul li").removeClass("active");
      $('.h2o .sticky-nav ul li a[href="#' + sectionId + '"]').parent('li').addClass('active');

      scrollQuery($target);
      $('html, body').stop().animate({
        'scrollTop': ($target.offset().top - targetScroll)
      }, 800, 'swing');
      setTimeout(function () {
        flag = true;
      }, 900);
    });
  }

  function activeonscrollUp() {
    $("body.h2o .sticky-nav ul li").each(function () {
      if (flag === true) {
        scrollId = $(this).find("a").attr("href");
        if ($(scrollId).length > 0) {
          var scrollTop = $(document).scrollTop(),
                  sectionOffset = $(scrollId).offset().top,
                  $navOffest = $("body.h2o header").outerHeight(),
                  $tocContentOffset = $(".sticky-nav").outerHeight();
          sectionposition = sectionOffset - scrollTop;
          if ($(".sticky-nav.fixed-nav").length > 0 && (sectionposition < 0)) {
            targetScroll = $tocContentOffset + $navOffest;
          } else {
            targetScroll = $tocContentOffset;
          }
          if (sectionposition <= targetScroll) {
            $(".h2o .sticky-nav ul li").removeClass("active");
            $(this).addClass("active");
          }
        }
      }
    });
  }

  function activeonscrollDown() {
    $("body.h2o .sticky-nav ul li").each(function () {
      if (flag === true) {
        scrollId = $(this).find("a").attr("href");
        if ($(scrollId).length > 0) {
          var scrollTop = $(document).scrollTop(),
                  sectionOffset = $(scrollId).offset().top,
                  $navOffest = $("body.h2o header").outerHeight(),
                  $tocContentOffset = $(".sticky-nav").outerHeight(),
                  windowHalf = ($(window).height()) / 2;
          sectionposition = sectionOffset - scrollTop;
          if ($(".sticky-nav.fixed-nav").length > 0 && $("body.h2o header").hasClass("off-canvas")) {
            targetScroll = $tocContentOffset + $navOffest;
          } else {
            targetScroll = $tocContentOffset;
          }
          if (sectionposition >= targetScroll && windowHalf >= sectionposition) {
            $(".h2o .sticky-nav ul li").removeClass("active");
            $(this).addClass("active");
          }
        }

      }
    });
  }

  // On DOM ready
  $(function () {
    /* Hide unavailable links */
    $("body.h2o .sticky-nav ul li").each(function () {
      scrollId = $(this).find("a").attr("href");
      if ($(scrollId).length <= 0) {
        $(this).hide();
      } else {
        $(this).addClass("scroll-link");
      }
    });
    setTimeout(function () {
      var linkLength = $("body.h2o .sticky-nav ul li.scroll-link").length;
      $("body.h2o .sticky-nav ul li.scroll-link:eq(" + (linkLength - 1) + ")").addClass("last-link");
    }, 500);
    var linkLength = $("body.h2o .sticky-nav ul li.scroll-link").length;
    $("body.h2o .sticky-nav ul li.scroll-link:eq(" + (linkLength - 1) + ")").addClass("last-link");
  });

  // On Window scroll & load
  $(window).on('scroll load', function () {
    if ($(".sticky-nav").length > 0) {
      /* Fix nav on scroll */
      var scrolled = $(document).scrollTop(),
              scollTop = $(".sticky-nav").offset().top,
              logoLeft = $("body.h2o header .logo").offset().left,
              navPosition = scollTop - scrolled,
              navHeight = $(".sticky-nav .container").height();
      if ((scrolled > scroll)) {
        if (navPosition <= 0) {
          $(".sticky-nav").addClass("fixed-nav").css({"height": navHeight + "px"});
          $(".sticky-nav .container").css({"padding-left": logoLeft + "px", "top": "0"});
        }
        activeonscrollUp();
      } else if ((scrolled < scroll)) {
        if ($("body.h2o header").hasClass("off-canvas")) {
          var headerHeight = $("body.h2o header").outerHeight();
          if (navPosition > headerHeight) {
            $(".sticky-nav").removeClass("fixed-nav").removeAttr("style");
            $(".sticky-nav .container").removeAttr("style");
          } else {
            $(".sticky-nav").addClass("fixed-nav").css({"height": navHeight + "px"});
            if ($("body.h2o header").hasClass("fixed")) {
              var headerHeight = $("body.h2o header").outerHeight();
              $(".sticky-nav .container").css({"top": headerHeight + "px", "padding-left": logoLeft + "px"});
            }
          }
        } else {
          if (navPosition > 0) {
            $(".sticky-nav").removeClass("fixed-nav").removeAttr("style");
            $(".sticky-nav .container").removeAttr("style");
          } else {
            if ($("body.h2o header").hasClass("fixed")) {
              $(".sticky-nav").removeClass("fixed-nav");
              var headerHeight = $("body.h2o header").outerHeight();
              $(".sticky-nav .container").css("top", headerHeight + "px");
            }
          }
        }
        activeonscrollDown();
      }
      scroll = $(document).scrollTop();
    }
  });

  // Bind logic to debounce
  var initOnResize = debounce(function () {
    navResize();
  }, 140);
  $(window).on('load', function () {
    smoothScroll();
    scollToSection();
//    var url = window.location.href,
//            hash = url.substring(url.indexOf('#')),
//            navHeight = $("body.h2o .sticky-nav").height();
//    //console.log(hash);
//
//    if (hash.length > 0) {
//      setTimeout(function () {
//        $('html, body').stop().animate({
//          'scrollTop': ($(hash).offset().top - navHeight)
//        }, 800, 'swing');
//      }, 900);
//    }
  });
  window.addEventListener('resize', initOnResize);

  // On orientation change
  $(window).on('orientationchange', function () {
    setTimeout(function () {
      if ($(".sticky-nav").length > 0) {
        var scrolled = $(document).scrollTop(),
                scollTop = $(".sticky-nav").offset().top,
                navPosition = scollTop - scrolled;
        if (navPosition > 0) {
          $(".sticky-nav").removeClass("fixed-nav").removeAttr("style");
          $(".sticky-nav .container").removeAttr("style");
        }
      }
    }, 100);
  });
})(jQuery);