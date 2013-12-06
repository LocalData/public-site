(function($) {
  'use strict';
  $(document).ready(function() { 
    $(':input').blur(function () {
      if($(this).val().length > 0) {
        _gaq.push(['_trackEvent', 'interest', 'completed', $(this).attr('id')]);
      } 
      else {
        _gaq.push(['_trackEvent', 'interest', 'skipped', $(this).attr('id')]);
      }
    });
  });
}(window.jQuery));

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
    data = encodeURIComponent('"' + data + '"');
    var yqlUrl = '//query.yahooapis.com/v1/public/yql?q=use%20%22store%3A%2F%2F7O6gDwLPu9H5ckqCZGEKxs%22%20as%20google.spreadsheet.post%3B%20insert%20into%20google.spreadsheet.post%20(formkey%2C%20data)%20VALUES%20(%22dDQ5Vm02REM2dEZGalA3bnpqS1BEZmc6MQ%22%2C%20' + data + ')&format=json';

    //console.log("posting");
    // Record responses in the spreadsheet.
    $.ajax({
      url: yqlUrl,
      type: 'GET',
      dataType: 'jsonp'
    }).done(function () {
      // Thank the user.
      //console.log("done");

      $('#sec-form').hide(500, function () {
        window.scrollTo(0, $('.text').position().top);
        $('#sec-start').hide();
        $('#sec-thanks').show(600);
      });
    }).fail(function () {
      $('#form-submit').val('Oops! Please try again in a bit.');
      setTimeout(function () {
        $('#form-submit').val('Submit');
      }, 2000);
    }).always(function () {
      // Submit signup info to Campaign Monitor.
      var $cm = $(window.frames[0].document);
      $cm.find('#hidden-name').val($('#form-name').val());
      $cm.find('#hidden-email').val($('#form-email').val());
      $cm.find('#hidden-org').val($('#form-organization').val());
      $cm.find('#hidden-form').submit();

    });

    // Record an analytics event
    _gaq.push(['_trackEvent', 'interest', 'submit']);
  });
});
