$(document).ready(function() {
  $("#createAlertBox").hide();
  var token = localStorage.getItem("token");

  $("#createCategory").submit(function(e) {
    e.preventDefault();

    var user = {};
    var inputs = $(this).serializeArray();
    //console.log(inputs);

    var isMeal = 0;

    $.each(inputs, function(i, v) {
      if (v.name == "isMeal") isMeal = 1;
      user[v.name] = v.value;
    });

    if (isMeal == 0) user["isMeal"] = 0;

    //console.log(user);

    $.ajax({
      url: "http://mess-api.herokuapp.com/api/v1/user/category/addCategory",
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
