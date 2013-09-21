$(function(){
  'use strict';
  function resize() {
    $('header .photo').css('min-height', $('.text').height());
  }
  window.onresize = resize;
  resize();
});
