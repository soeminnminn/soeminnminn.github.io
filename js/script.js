; (function() {

  'use strict';

  const clickMenu = function () {

    $('#nav-menu a:not([class="external"])').click(function (event) {
      const section = $(this).data('nav-section');
      const navbar = $('#side-menu-nav');

      if ($('[data-section="' + section + '"]').length) {
        $('html, body').animate({
          scrollTop: $('[data-section="' + section + '"]').offset().top - 55
        }, 500);
      }

      if (navbar.hasClass('show')) {
        navbar.removeClass('show');
      }

      event.preventDefault();
      return false;
    });
  };

  const navActive = function (section) {
    const $el = $('#nav-menu > ul');
    $el.find('li').removeClass('active');
    $el.each(function () {
      $(this).find('a[data-nav-section="' + section + '"]').closest('li').addClass('active');
    });
  };

  const navigationSection = function() {
    const $section = $('section[data-section]');

    $section.waypoint(function (direction) {
      if (direction === 'down') {
        navActive($(this.element).data('section'));
      }
    }, {
      offset: '150px'
    });

    $section.waypoint(function (direction) {
      if (direction === 'up') {
        navActive($(this.element).data('section'));
      }
    }, {
      offset: function () {
        return -$(this.element).height() + 155;
      }
    });
  };

  const sendEmail = function() {
    $('#contact-form').submit(function(ev) {
      ev.preventDefault();

      const formData = {
        Host: "smtp.gmail.com",
        Username : "sulfur.smm@gmail.com",
        Password : "",
        'name' : $('input[name=name]').val(),
        To : 'soeminnminn@gmail.com',
        From : $('input[name=email]').val(),
        Subject : $('input[name=subject]').val(),
        Body : $('textarea[name=body]').val(),
        Attachments : []
      };

      Email.send(formData).then(
        message => alert(message)
      );
    });
  };

  const topScroller = function() {
    $(window).scroll(function(){
      if ($(this).scrollTop() > 400) {
        $('.js-top-scrollerx').fadeIn();
      } else {
        $('.js-top-scrollerx').fadeOut();
      }
    });
    //Click event to scroll to top
    $('.js-top-scrollerx').click(function(){
      $('html, body').animate({scrollTop : 0},1000);
      return false;
    });
  };

  // Document on load.
  $(function () {
    clickMenu();
    navigationSection();
    // sendEmail();
    topScroller();
  });
}());