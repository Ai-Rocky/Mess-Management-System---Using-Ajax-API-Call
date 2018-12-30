$(document).ready(function() {
  $("#editAlertBox").hide();
  var token = localStorage.getItem("token");

  $("#editCategory").submit(function(e) {
    e.preventDefault();

    var user = {};
    var inputs = $(this).serializeArray();

    $.each(inputs, function(i, v) {
      user[v.name] = v.value;
    });

    var isMeal = 0;

    $.each(inputs, function(i, v) {
      if (v.name == "isMeal") isMeal = 1;
      user[v.name] = v.value;
    });

    if (isMeal == 0) user["isMeal"] = 0;

    var categoryId = $("#catId").text();

    $.ajax({
      url:
        "http://mess-api.herokuapp.com/api/v1/user/category/updateCategory/" +
        categoryId,
      type: "put",
      dataType: "json",
      data: user,
      headers: { "x-auth-token": JSON.parse(token) },
      success: function(data) {
        console.log(data);
        location.reload();
      },
      error: function(e) {
        console.log(e);
        $("#editAlertBox").show();
        $("#editAlert").text(e.responseJSON.message);
      }
    });
    return false;
  });
});
