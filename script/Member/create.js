$(document).ready(function() {
  $("#createAlertBox").hide();
  var token = localStorage.getItem("token");

  $("#createMember").submit(function(e) {
    e.preventDefault();

    var user = {};
    var inputs = $(this).serializeArray();

    $.each(inputs, function(i, v) {
      user[v.name] = v.value;
    });

    $.ajax({
      url: "http://mess-api.herokuapp.com/api/v1/user/addUser",
      type: "post",
      dataType: "json",
      data: user,
      headers: { "x-auth-token": JSON.parse(token) },
      success: function(data) {
        console.log(data);
        location.reload();
      },
      error: function(e) {
        console.log(e);
        $("#createAlertBox").show();
        $("#createAlert").text(e.responseJSON.message);
      }
    });
    return false;
  });
});
