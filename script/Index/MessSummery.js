$(document).ready(function() {
  var token = localStorage.getItem("token");
  var date = new Date();
  var thisYear = date.getFullYear();
  var thisMonth = date.getMonth() + 1;
  var thisDay = date.getDate();
  var firstDate = thisYear + "-" + thisMonth + "-01";
  var lastDate = thisYear + "-" + thisMonth + "-" + thisDay;
  console.log(dateFuntion(firstDate));

  $("#messAlertBox").hide();
  $("#firstDate").val(dateFuntion(firstDate));
  $("#lastDate").val(dateFuntion(lastDate));

  $(".summeryDate").change(function() {
    var user = {};
    var inputs = $("#messSummery").serializeArray();

    $.each(inputs, function(i, v) {
      user[v.name] = v.value;
    });

    $.ajax({
      url: "http://mess-api.herokuapp.com/api/v1/mess/messSummary",
      type: "post",
      dataType: "json",
      data: user,
      headers: { "x-auth-token": JSON.parse(token) },
      success: function(data) {
        console.log(data);

        $("#messTS").text(data.data.totalSavings);
        $("#messTE").text(data.data.totalExpense);
        $("#messTM").text(data.data.totalMeals);
        $("#messMR").text(data.data.mealRate);
        var messStatus;

        if (data.data.balanceStatus > 0) {
          messStatus =
            "Mess - <span class='text-danger'>" +
            data.data.balanceStatus +
            "</span> Debit";
        } else if (data.data.balanceStatus < 0) {
          messStatus =
            "Mess - <span class='text-success'>" +
            data.data.balanceStatus +
            "</span> Credit";
        } else {
          messStatus = "Mess - " + data.data.balanceStatus + " Perfect";
        }

        $("#messDC").html(messStatus);
      },
      error: function(e) {
        console.log(e);
        $("#messAlertBox").show();
        $("#messAlert").text(e.responseJSON.message);
      }
    });
    //return false;
  });

  $("#firstDate").trigger("change");
});

function dateFuntion(d) {
  var dateTime = new Date(d);
  var year = dateTime.getFullYear();
  var month = JSON.stringify(dateTime.getMonth() + 1).padStart(2, 0);
  var day = JSON.stringify(dateTime.getDate()).padStart(2, 0);
  var date = year + "-" + month + "-" + day;
  return date;
}
