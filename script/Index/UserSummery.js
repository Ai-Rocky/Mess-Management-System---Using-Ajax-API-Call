$(document).ready(function() {
  var token = localStorage.getItem("token");
  $("#userAlertBox").hide();

  var decodeToken = parseJwt(token);
  $(".memberList").val(decodeToken.id);

  $(".memberList").change(function() {
    var userId = $(this).val();
    var userName = $(this)
      .find("option:selected")
      .text();

    $.ajax({
      url: "http://mess-api.herokuapp.com/api/v1/mess/userSummary/" + userId,
      type: "get",
      dataType: "json",
      headers: { "x-auth-token": JSON.parse(token) },
      success: function(data) {
        console.log(data);
        $("#userTS").text(data.data.totalSavings);
        $("#userTE").text(data.data.totalExpense);
        $("#userTM").text(data.data.meals);
        var userStatus;
        if (data.data.balanceStatus > 0) {
          userStatus =
            userName +
            " - <span class='text-success'>" +
            data.data.balanceStatus +
            "</span> Credit";
        } else if (data.data.balanceStatus < 0) {
          userStatus =
            userName +
            " - <span class='text-danger'>" +
            data.data.balanceStatus +
            "</span> Debit";
        } else {
          userStatus = userName + " - " + data.data.balanceStatus + " Perfect";
        }

        $("#userDC").html(userStatus);
      },
      error: function(e) {
        console.log(e);
        $("#userAlertBox").show();
        $("#userAlert").text(e.responseJSON.message);
      }
    });
  });

  $(".memberList").trigger("change");
});
