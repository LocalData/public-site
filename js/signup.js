$(document).ready(function () {
  'use strict';

  var tier = location.hash.slice(1);

  var formId = '1dAoHK3OeEIhmvoP6aIHq2HqO2Ozkj0G0D-VhMp8nuLQ';

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

    $('#form-tier').val(tier);

    var data = $(this).serialize();
    data = encodeURIComponent('"' + data + '"');
    var yqlUrl = '//query.yahooapis.com/v1/public/yql?q=use%20%22store%3A%2F%2F655IyAFJHky3vsamSX7m7C%22%20as%20google.form.post%3B%20insert%20into%20google.form.post%20(formId%2C%20data)%20VALUES%20(%22' + formId + '%22%2C%20' + data + ')&format=json';

    // Record responses in the spreadsheet.
    $.ajax({
      url: yqlUrl,
      type: 'GET',
      dataType: 'jsonp'
    }).done(function () {
      // Thank the user.

      $('#sec-form').hide(500, function () {
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
      $cm.find('#hidden-email').val($('#form-email').val());
      $cm.find('#hidden-tier').val(tier);
      $cm.find('#hidden-form').submit();
    });

    // Record an analytics event
    _gaq.push(['_trackEvent', 'ltsignup', 'submit', tier]);
  });
});
