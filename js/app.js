$(function(){
  'use strict';
  function resize() {
    var textHeight = $('.text').height() || $('.measureme').height();
    var height = $( window ).height() - 100;
    var minHeight;
    if (height > textHeight) {
      minHeight = height;
    } else {
      minHeight = textHeight;
      console.log("Using textHeight", textHeight);
    }

    if($(window).width() < 769) {
      minHeight = 100;
    }
    console.log(minHeight);
    $('header .photo').css('min-height', minHeight);
  }

  resize();
  $(window).resize(resize);

  var $backs = $('.demoback');
  $backs.each(function(i, el) {
    var height = $(el).parent().height();
    $(el).css('min-height', height);
  });
});
