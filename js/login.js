$(function () {
  $('#doc-vld-msg').validator({
    onValid: function (validity) {
      $(validity.field).closest('.am-form-group').find('.am-alert').hide();
    },

    onInValid: function (validity) {
      var $field = $(validity.field);
      var $group = $field.closest('.am-form-group');
      var $alert = $group.find('.am-alert');
      // 使用自定义的提示信息 或 插件内置的提示信息
      var msg = $field.data('validationMessage') || this.getValidationMessage(validity);

      if (!$alert.length) {
        $alert = $('<div class="am-alert am-alert-danger"></div>').hide().
        appendTo($group);
      }
      $alert.html(msg).show();
    }
  });

  var request;
  $("#doc-vld-msg").submit(function (event) {
    event.preventDefault();
    if (request) {
      request.abort();
    }
    var $form = $(this);
    var $inputs = $form.find("input, select, button, textarea");
    var vname = $("#doc-vld-name-2-1").val();
    var vpwd = $("#doc-vld-pwd-1").val();
    var serializedData = {
      "username": vname,
      "password": vpwd
    };
    var serializedData_json = JSON.stringify(serializedData);
    $inputs.prop("disabled", true);
    request = $.ajax({
      url: "/api/login",
      type: "post",
      data: serializedData_json,
      contentType: 'application/json',
    });
    request.done(function (response, textStatus, jqXHR) {
      var result = response.result;
      var user_result = JSON.stringify(result);
      localStorage.setItem("user",user_result);
      window.location.href = "/";
    });
    request.fail(function (jqXHR, textStatus, errorThrown) {
      console.error(
        "The following error occurred: " +
        textStatus, errorThrown
      );
    });
    request.always(function () {
      $inputs.prop("disabled", false);
    });

  });
});