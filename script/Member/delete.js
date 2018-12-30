$(document).ready(function() {
  $("#deleteAlertBox").hide();
  var token = localStorage.getItem("token");

  $("#deleteMember").submit(function(e) {
    e.preventDefault();

    var memberId = $("#memberId").text();
    //console.log(categoryId);

    $.ajax({
      url: "http://mess-api.herokuapp.com/api/v1/user/removeUser/" + memberId,
      type: "delete",
      dataType: "json",
      headers: { "x-auth-token": JSON.parse(token) },
      success: function(data) {
        console.log(data);
        location.reload();
      },
      error: function(e) {
        console.log(e);
        $("#deleteAlertBox").show();
        $("#deleteAlert").text(e.responseJSON.message);
      }
    });
    return false;
  });
});
