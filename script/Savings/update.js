$(document).ready(function() {
  $("#editAlertBox").hide();
  var token = localStorage.getItem("token");

  $("#editSavings").submit(function(e) {
    e.preventDefault();

    var user = {};
    var inputs = $(this).serializeArray();

    $.each(inputs, function(i, v) {
      user[v.name] = v.value;
    });

    var savingsId = $("#savingsId").text();

    $.ajax({
      url:
        "http://mess-api.herokuapp.com/api/v1/user/balance/updateBalance/" +
        savingsId,
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
