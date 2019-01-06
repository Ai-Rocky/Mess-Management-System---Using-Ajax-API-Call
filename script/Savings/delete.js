$(document).ready(function() {
  $("#deleteAlertBox").hide();
  var token = localStorage.getItem("token");

  $("#deleteSavings").submit(function(e) {
    e.preventDefault();

    var savingsId = $("#savingsId").text();
    //console.log(categoryId);

    $.ajax({
      url:
        "http://mess-api.herokuapp.com/api/v1/user/balance/deleteBalance/" +
        savingsId,
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
