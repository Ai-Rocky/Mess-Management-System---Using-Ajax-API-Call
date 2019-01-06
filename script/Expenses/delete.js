$(document).ready(function() {
  $("#deleteAlertBox").hide();
  var token = localStorage.getItem("token");

  $("#deleteExpenses").submit(function(e) {
    e.preventDefault();

    var expensesId = $("#expensesId").text();
    //console.log(categoryId);

    $.ajax({
      url:
        "http://mess-api.herokuapp.com/api/v1/user/expense/deleteExpense/" +
        expensesId,
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
