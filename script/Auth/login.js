$(document).ready(function() {
  $("#loginAlertBox").hide();

  $("#login").submit(function() {
    var user = {};
    var inputs = $(this).serializeArray();

    $.each(inputs, function(i, v) {
      user[v.name] = v.value;
    });

    var flag = 0;

    $.ajax({
      url: "http://mess-api.herokuapp.com/api/auth/login",
      type: "post",
      dataType: "json",
      // crossDomain: true,
      // xhrFields: { withCredentials: false },
      data: user,
      success: function(data) {
        console.log(data);
        localStorage.setItem("token", JSON.stringify(data.data.token));
        window.location.href = "../Manager/index.html";
      },
      error: function(e) {
        console.log(e);
        $("#loginAlertBox").show();
        $("#loginAlert").text(e.responseJSON.message);
      }
    });

    return false;
  });
});
