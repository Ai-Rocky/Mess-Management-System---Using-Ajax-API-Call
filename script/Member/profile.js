$(document).ready(function() {
  $("#profileAlertBox").hide();

  var token = localStorage.getItem("token");

  $.ajax({
    url: "http://mess-api.herokuapp.com/api/v1/user/getProfile",
    type: "get",
    dataType: "json",
    headers: { "x-auth-token": JSON.parse(token) },
    success: function(data) {
      console.log(data);
      $("#profileEmail").text(data.data.email);
      $("#profileUsername").text(data.data.username);
      $("#profileMobile").text(data.data.phone);
      $("#profileAddress").text(data.data.address);
    },
    error: function(e) {
      console.log(e);
      $("#profileAlertBox").show();
      $("#profileAlert").text(e.responseJSON.message);
    }
  });

  $(".updateProfile").submit(function() {
    // e.preventDefault();

    var user = {};
    var inputs = $(this).serializeArray();

    $.each(inputs, function(i, v) {
      user[v.name] = v.value;
    });

    $.ajax({
      url: "http://mess-api.herokuapp.com/api/v1/user/updateProfile",
      type: "put",
      dataType: "json",
      data: user,
      headers: { "x-auth-token": JSON.parse(token) },
      success: function(data) {
        localStorage.removeItem("token");
        console.log(data);
        location.reload();
      },
      error: function(e) {
        console.log(e);
        $("#profileAlertBox").show();
        $("#profileAlert").text(e.responseJSON.message);
      }
    });
    return false;
  });

  $("#updatePass").submit(function() {
    // e.preventDefault();
    var user = {};
    var inputs = $(this).serializeArray();

    $.each(inputs, function(i, v) {
      user[v.name] = v.value;
    });

    $.ajax({
      url: "http://mess-api.herokuapp.com/api/v1/user/changePassword",
      type: "put",
      dataType: "json",
      data: user,
      headers: { "x-auth-token": JSON.parse(token) },
      success: function(data) {
        localStorage.removeItem("token");
        console.log(data);
        location.reload();
      },
      error: function(e) {
        console.log(e);
        $("#profileAlertBox").show();
        $("#profileAlert").text(e.responseJSON.message);
      }
    });
    return false;
  });
});
