
$(document).ready(function () {
  'use strict';

  // Fill in e-mail from fragment
  if (location.hash !== '') {
    $('#form-email').val(decodeURIComponent(location.hash.slice(1)));
  }

  var path = '/a/localdata.com/spreadsheet/formResponse?formkey=dDQ5Vm02REM2dEZGalA3bnpqS1BEZmc6MQ&ifq';
  var formUrl = 'https://docs.google.com' + path;

  function setCheckToggle(id) {
    var $el = $('#' + id);
    $el.change(function handleToggle(e) {
      var $sub = $('div[data-condition="' + id + '"]');
      if ($el.prop('checked')) {
        $sub.show(400);
      } else {
        $sub.hide(400);
      }
    });
  }

  function setRadioToggle(id, name, yes) {
    var $el = $('input[name="' + name + '"]');
    $el.change(function handleToggle(e) {
      var $checked = $('input[name="' + name + '"]:checked');
      var $sub = $('div[data-condition="' + id + '"]');
      if ($checked.val() === yes) {
        $sub.show(400);
      } else {
        $sub.hide(400);
      }
    });
  }

  setRadioToggle('soon-yes', 'entry.7.group', 'yes');
  setRadioToggle('past-yes', 'entry.14.group', 'yes');
  setCheckToggle('tech-1');


  // Collect and submit entries from the form.
  $('#sec-form').submit(function (e) {
    e.preventDefault();
    $('#form-submit').val('Submitting...');

    // Validation
    $('#req-message').hide();
    var valid = true;
    $('input[data-required="true"]').each(function () {
      var val = $(this).val();
      if (!val) {
        $(this).addClass('missing');
        valid = false;
      }else {
        $(this).removeClass('missing');
      }
    });

    if (!valid) {
      $('#req-message').show();
      $('#form-submit').val('Submit');
      $('body').animate({
        scrollTop: 0
      });
      return;
    }

    var data = $(this).serialize();
    console.log("posting");
    // Record responses in the spreadsheet.
    $.ajax({
      url: formUrl,
      data: data,
      type: 'POST',
      headers: {
        ':host': 'docs.google.com',
        ':method': 'POST',
        ':path': path,
        ':scheme': 'https',
        ':version': 'HTTP/1.1'
      }
    }).done(function () {
      // Thank the user.
      console.log("done");

      $('#sec-form').hide(500, function () {
        $('#sec-thanks').show(600);
      });
    }).fail(function () {
      $('#form-submit').val('Oops! Please try again in a bit.');
      setTimeout(function () {
        $('#form-submit').val('Submit');
      }, 2000);
    });
  });
});
