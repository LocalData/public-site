$(function(){
  'use strict';
  function resize() {
    var textHeight = $('.text').height();
    var height = $( window ).height() - 100;
    var minHeight = height > textHeight ? height : textHeight;

    if($(window).width() < 769) {
      minHeight = 100;
    }
    console.log(minHeight);
    $('header .photo').css('min-height', minHeight);
  }

  $(window).resize(resize);

  var $backs = $('.demoback');
  $backs.each(function(i, el) {
    var height = $(el).parent().height();
    $(el).css('min-height', height);
  });
});
