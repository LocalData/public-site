$(function(){
  'use strict';
  // function resize() {
  //   $('header .photo').css('min-height', $('.text').height());
  // }
  // window.onresize = resize;
  // resize();

  var textHeight = $('.text').height();
  var height = $( window ).height() - 100;
  var minHeight = height > textHeight ? height : textHeight;
  console.log(minHeight);
  $('header .photo').css('min-height', minHeight);


  var $backs = $('.demoback');
  $backs.each(function(i, el) {
    var height = $(el).parent().height();
    $(el).css('min-height', height);
  });
});
