$(document).ready(function() {
  $("#signupAlertBox").hide();

  $("#signup").submit(function() {
    var user = {};
    var inputs = $(this).serializeArray();

    $.each(inputs, function(i, v) {
      user[v.name] = v.value;
    });

    $.ajax({
      url: "http://mess-api.herokuapp.com/api/auth/signup",
      type: "post",
      dataType: "json",
      data: user,
      success: function(data) {
        console.log(data);
        $("#signupAlertBox").show();
        $("#signupAlertDanger").hide();
        $("#signupAlertSuccess")
          .show()
          .text("Your mess create successful, Please login your mess !");
        $(":reset").trigger("click");
      },
      error: function(e) {
        console.log(e);
        $("#signupAlertBox").show();
        $("#signupAlertSuccess").hide();
        $("#signupAlertDanger")
          .show()
          .text(e.responseJSON.message);
      }
    });
    return false;
  });
});
